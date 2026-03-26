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
    // 1. Look for ID in params (for GET/PATCH) or body (for POST)
    const mediaId = req.params.id || req.body.mediaId; //
    const userId = req.user.id; //

    if (!mediaId) {
      throw new AppError(
        status.BAD_REQUEST,
        "Media ID is required for access verification.",
      );
    }

    // 2. Use findFirst to safely include the 'isDeleted' check
    const media = await prisma.media.findFirst({
      where: {
        id: mediaId as string,
        isDeleted: false,
      },
      select: { pricing: true },
    });

    if (!media) throw new AppError(status.NOT_FOUND, "Media not found");

    // 3. Public Access pass-through
    if (media.pricing === "FREE") return next();

    // 4. Subscription Validation Logic
    const activeSub = await prisma.subscription.findFirst({
      where: {
        userId,
        isActive: true,
        endDate: { gte: new Date() },
      },
      orderBy: { type: "desc" },
    });

    if (!activeSub) {
      throw new AppError(
        status.FORBIDDEN,
        "Active subscription required for Premium content.",
      );
    }

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
