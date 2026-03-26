import { z } from "zod";
import { SubscriptionType } from "../../../generated/prisma/enums";

const initiatePaymentSchema = z.object({
  body: z.object({
    type: z.enum(
      SubscriptionType,
      "Subscription type is required (BASIC, PRO, or PREMIUM)",
    ),
  }),
});

export const PaymentValidation = {
  initiatePaymentSchema,
};
