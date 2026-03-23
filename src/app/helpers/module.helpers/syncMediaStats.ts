import { ReviewStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// Helper: Recalculate Media stats
export const syncMediaStats = async (mediaId: string) => {
  const stats = await prisma.review.aggregate({
    where: { mediaId, status: ReviewStatus.APPROVED, isDeleted: false },
    _avg: { rating: true },
    _count: { id: true },
  });

  await prisma.media.update({
    where: { id: mediaId },
    data: {
      averageRating: stats._avg.rating || 0,
      reviewCount: stats._count.id,
    },
  });
};
