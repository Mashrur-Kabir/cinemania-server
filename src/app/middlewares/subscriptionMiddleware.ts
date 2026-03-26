import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";
import status from "http-status";
import { catchAsync } from "../shared/catchAsync";

/**
 * Ensures the user has an active, non-expired subscription.
 */
export const checkActiveSubscription = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user.id;

    // 1. Fetch the media to check its pricing tier
    const media = await prisma.media.findUnique({
      where: { id: id as string, isDeleted: false },
      select: { pricing: true },
    });

    if (!media) throw new AppError(status.NOT_FOUND, "Media not found");

    // 2. Public Access: If it's FREE, let them through immediately
    if (media.pricing === "FREE") return next();

    // 3. Subscription Check: Find their best active sub
    const activeSub = await prisma.subscription.findFirst({
      where: {
        userId,
        isActive: true,
        endDate: { gte: new Date() },
      },
      orderBy: { type: "desc" }, // Prioritize higher tiers if they have multiple
    });

    if (!activeSub) {
      throw new AppError(
        status.FORBIDDEN,
        "Active subscription required for Premium content.",
      );
    }

    // 4. Tier Validation Logic
    const tierWeights = { BASIC: 1, PRO: 2, PREMIUM: 3 };
    const userTierWeight = tierWeights[activeSub.type];
    const mediaTierWeight =
      tierWeights[media.pricing as keyof typeof tierWeights] || 0;

    if (userTierWeight < mediaTierWeight) {
      throw new AppError(
        status.FORBIDDEN,
        `This content requires a ${media.pricing} subscription. Your current plan is ${activeSub.type}.`,
      );
    }

    req.subscription = activeSub;
    next();
  },
);
