/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReviewStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

/**
 * Recalculates and updates the Media model's counters.
 * Accepts an optional 'tx' to participate in existing transactions.
 */
export const syncMediaStats = async (mediaId: string, tx?: any) => {
  const client = tx || prisma;

  // 1. Aggregate the latest stats for approved reviews
  const stats = await client.review.aggregate({
    where: {
      mediaId,
      status: ReviewStatus.APPROVED,
      isDeleted: false,
    },
    _avg: { rating: true },
    _count: { _all: true },
  });

  // 2. Update the Media record with the new calculated values
  await client.media.update({
    where: { id: mediaId },
    data: {
      averageRating: stats._avg.rating || 0,
      reviewCount: stats._count._all || 0,
    },
  });
};
