import { Pricing, SubscriptionType } from "../../../generated/prisma/enums";

/**
 * Helper to determine allowed content based on subscription weight
 */
export const getAllowedTiers = (type?: SubscriptionType): Pricing[] => {
  const weights: Record<SubscriptionType, number> = {
    BASIC: 1,
    PRO: 2,
    PREMIUM: 3,
  };
  const userWeight = type ? weights[type] : 0;

  const allowed: Pricing[] = [Pricing.FREE];
  if (userWeight >= 1) allowed.push(Pricing.BASIC);
  if (userWeight >= 2) allowed.push(Pricing.PRO);
  if (userWeight >= 3) allowed.push(Pricing.PREMIUM);

  return allowed;
};
