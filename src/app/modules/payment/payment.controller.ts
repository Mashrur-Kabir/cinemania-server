/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import { stripe } from "../../../config/stripe.config";
import { envVars } from "../../../config/env";

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const { type } = req.body;
  const userId = req.user.id;
  const checkoutUrl = await PaymentService.createCheckoutSessionInDB(
    userId,
    type,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Checkout session created",
    data: {
      paymentUrl: checkoutUrl, // Refined structure
    },
  });
});

const handleStripeWebhookEvent = catchAsync(
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"] as string;
    const webhookSecret = envVars.STRIPE.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Missing Stripe signature or secret" });
    }

    let event;

    try {
      // req.body here is the raw Buffer because of the express.raw() in app.ts
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret,
      );
    } catch (error: any) {
      console.error("Stripe Webhook Error:", error.message);
      return res
        .status(status.BAD_REQUEST)
        .send(`Webhook Error: ${error.message}`);
    }

    // Pass the verified event to the service
    const result = await PaymentService.handleStripeWebhookService(event);

    res.status(status.OK).json(result);
  },
);

const getMyBillingHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await PaymentService.getMyBillingHistoryFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Billing history retrieved successfully",
    data: result,
  });
});

const getSubscriptionSummary = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentService.getSubscriptionSummaryFromDB(
      req.user.id,
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Subscription summary retrieved",
      data: result,
    });
  },
);

export const PaymentController = {
  handleStripeWebhookEvent,
  initiatePayment,
  getMyBillingHistory,
  getSubscriptionSummary,
};
