import { SubscriptionType } from "../../../generated/prisma/enums";

export const planPrices: Record<SubscriptionType, number> = {
  BASIC: 999, // $9.99 in cents
  PRO: 1999, // $19.99
  PREMIUM: 2999, // $29.99
};
