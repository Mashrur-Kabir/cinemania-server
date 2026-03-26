/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import {
  PaymentStatus,
  SubscriptionType,
} from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../../config/stripe.config";
import { envVars } from "../../../config/env";
import { planPrices } from "./payment.constants";
import { Prisma } from "../../../generated/prisma/client";
import { PaymentHelper } from "../../helpers/module.helpers/processPostPaymentTask";

const createCheckoutSessionInDB = async (
  userId: string,
  type: SubscriptionType,
) => {
  const amount = planPrices[type];

  // 1. Create Pending Payment Record first
  const payment = await prisma.payment.create({
    data: {
      userId,
      amount: amount / 100,
      status: PaymentStatus.PENDING,
      transactionId: `tmp_${Date.now()}`,
    },
  });

  // 2. Call Stripe outside the DB transaction
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Cinemania ${type} Plan`,
              description: "30 Days of Unlimited Cinematic Access",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${envVars.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${envVars.FRONTEND_URL}/payment/cancel`,
      metadata: { userId, paymentId: payment.id, subscriptionType: type },
    });

    return session.url;
  } catch (error) {
    // Fail the payment record if Stripe fails to initialize
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.FAILED },
    });
    throw error;
  }
};

const handleStripeWebhookService = async (event: Stripe.Event) => {
  // 1. Idempotency Check (Only for events that create/update records)
  if (event.type === "checkout.session.completed") {
    const existingPayment = await prisma.payment.findUnique({
      where: { stripeEventId: event.id },
    });
    if (existingPayment) return { message: "Event already processed" };
  }

  // 2. Event Handling
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, paymentId, subscriptionType } = session.metadata || {};

      if (!userId || !paymentId) throw new Error("Incomplete metadata");

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        // Update Payment
        const payment = await tx.payment.update({
          where: { id: paymentId },
          data: {
            status: PaymentStatus.PAID,
            transactionId: session.payment_intent as string,
            paymentGatewayData: session as unknown as Prisma.InputJsonValue,
            stripeEventId: event.id,
          },
        });

        // Upsert Subscription
        const now = new Date();
        const durationInMs = 30 * 24 * 60 * 60 * 1000;
        const existingSub = await tx.subscription.findFirst({
          where: { userId, isActive: true, endDate: { gte: now } },
        });

        let subscription;
        if (existingSub) {
          subscription = await tx.subscription.update({
            where: { id: existingSub.id },
            data: {
              type: subscriptionType as SubscriptionType,
              endDate: new Date(existingSub.endDate.getTime() + durationInMs),
            },
          });
        } else {
          subscription = await tx.subscription.create({
            data: {
              userId,
              type: subscriptionType as SubscriptionType,
              startDate: now,
              endDate: new Date(now.getTime() + durationInMs),
              isActive: true,
            },
          });
        }

        await tx.payment.update({
          where: { id: paymentId },
          data: { subscriptionId: subscription.id },
        });

        return { user, payment, subscription };
      });

      // Background Tasks
      PaymentHelper.processPostPaymentTasks(
        result,
        subscriptionType as string,
      ).catch((err) =>
        console.error("Post-payment background task failed:", err),
      );

      break;
    }

    case "invoice.payment_failed":
    case "customer.subscription.deleted": {
      const data = event.data.object as any;
      // Stripe usually passes metadata through to the invoice object
      const userId = data.metadata?.userId || data.client_reference_id;

      if (userId) {
        await prisma.subscription.updateMany({
          where: { userId, isActive: true },
          data: { isActive: false },
        });
        console.log(`Access revoked for user ${userId} due to ${event.type}`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return { success: true };
};

const getMyBillingHistoryFromDB = async (userId: string) => {
  return await prisma.payment.findMany({
    where: { userId },
    include: {
      subscription: {
        select: { type: true, startDate: true, endDate: true, isActive: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Subscription Summary API
 * Returns current plan details and remaining time.
 */
const getSubscriptionSummaryFromDB = async (userId: string) => {
  const activeSub = await prisma.subscription.findFirst({
    where: {
      userId,
      isActive: true,
      endDate: { gte: new Date() },
    },
    orderBy: { endDate: "desc" },
  });

  if (!activeSub) {
    return {
      hasActiveSubscription: false,
      plan: null,
      daysRemaining: 0,
    };
  }

  const now = new Date();
  const diffTime = Math.abs(activeSub.endDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    hasActiveSubscription: true,
    plan: activeSub.type,
    expiryDate: activeSub.endDate,
    daysRemaining: diffDays,
  };
};

//cron task:
const syncExpiredSubscriptions = async () => {
  return await prisma.subscription.updateMany({
    where: {
      isActive: true,
      endDate: { lt: new Date() },
    },
    data: { isActive: false },
  });
};

export const PaymentService = {
  createCheckoutSessionInDB,
  handleStripeWebhookService,
  getMyBillingHistoryFromDB,
  getSubscriptionSummaryFromDB,
  syncExpiredSubscriptions,
};
