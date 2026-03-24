import { prisma } from "../../lib/prisma";
import { IReviewFilterOptions, IReviewPayload } from "./review.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import { ReviewStatus } from "../../../generated/prisma/enums";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Prisma, Review } from "../../../generated/prisma/client";
import {
  reviewFilterableFields,
  reviewIncludeConfig,
  reviewSearchableFields,
} from "./review.constants";
import { syncMediaStats } from "../../helpers/module.helpers/syncMediaStats";

const createReviewInDB = async (userId: string, payload: IReviewPayload) => {
  // 1. Prevent multiple reviews for same media by same user
  const existingReview = await prisma.review.findFirst({
    where: { userId, mediaId: payload.mediaId, isDeleted: false },
  });

  if (existingReview) {
    throw new AppError(
      status.CONFLICT,
      "You have already reviewed this title.",
    );
  }

  return await prisma.review.create({
    data: { ...payload, userId },
  });
};

const updateReviewInDB = async (
  userId: string,
  reviewId: string,
  payload: Partial<IReviewPayload>,
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.isDeleted)
    throw new AppError(status.NOT_FOUND, "Review not found");
  if (review.userId !== userId)
    throw new AppError(status.FORBIDDEN, "You can only edit your own reviews.");

  return await prisma.$transaction(async (tx) => {
    // If it was already approved, we need to hide it and re-moderate
    const needsRemoderation = review.status === ReviewStatus.APPROVED;

    const updatedReview = await tx.review.update({
      where: { id: reviewId },
      data: {
        ...payload,
        status: needsRemoderation ? ReviewStatus.PENDING : review.status,
      },
    });

    // If it was approved, it's now 'Pending', so we MUST remove its impact from the movie stats
    if (needsRemoderation) {
      await syncMediaStats(review.mediaId, tx);
    }

    return updatedReview;
  });
};

const updateReviewStatus = async (
  reviewId: string,
  newStatus: ReviewStatus,
) => {
  return await prisma.$transaction(async (tx) => {
    const review = await tx.review.update({
      where: { id: reviewId },
      data: { status: newStatus },
    });

    // If approved or moved out of approved, sync the media stats
    await syncMediaStats(review.mediaId, tx);
    return review;
  });
};

const toggleLikeInDB = async (userId: string, reviewId: string) => {
  // 1. Fetch the review to check its status
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  // 2. Safeguard: Only allow likes on Approved and non-deleted reviews
  if (!review || review.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Review not found");
  }

  if (review.status !== ReviewStatus.APPROVED) {
    throw new AppError(
      status.BAD_REQUEST,
      "You can only like reviews that have been approved by moderators.",
    );
  }

  // 3. Check for existing like
  const existingLike = await prisma.like.findUnique({
    where: { userId_reviewId: { userId, reviewId } },
  });

  return await prisma.$transaction(async (tx) => {
    if (existingLike) {
      await tx.like.delete({ where: { id: existingLike.id } });
      return await tx.review.update({
        where: { id: reviewId },
        data: { likeCount: { decrement: 1 } },
      });
    } else {
      await tx.like.create({ data: { userId, reviewId } });
      return await tx.review.update({
        where: { id: reviewId },
        data: { likeCount: { increment: 1 } },
      });
    }
  });
};
const getAllReviewsFromDB = async (filters: IReviewFilterOptions) => {
  const reviewQuery = new QueryBuilder<
    Review,
    Prisma.ReviewWhereInput,
    Prisma.ReviewInclude
  >(prisma.review, filters, {
    searchableFields: reviewSearchableFields,
    filterableFields: reviewFilterableFields,
  });

  const result = await reviewQuery
    .search()
    .filter()
    .where({ isDeleted: false })
    .dynamicInclude(reviewIncludeConfig)
    .sort()
    .paginate()
    .fields()
    .execute();

  return result;
};

const reportReviewInDB = async (
  userId: string,
  reviewId: string,
  reason: string,
) => {
  // Check if review exists
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new AppError(status.NOT_FOUND, "Review not found");

  return await prisma.reviewReport.create({
    data: {
      userId,
      reviewId,
      reason,
    },
  });
};

const getReportedReviewsFromDB = async () => {
  // This helps Admins see which reviews are getting flagged
  return await prisma.reviewReport.findMany({
    include: {
      user: { select: { name: true, email: true } }, // Who reported it
      review: {
        include: {
          user: { select: { name: true } }, // Who wrote the original review
          media: { select: { title: true } }, // Which movie it's for
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const deleteReviewFromDB = async (
  userId: string,
  role: string,
  reviewId: string,
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new AppError(status.NOT_FOUND, "Review not found");
  }

  // 1. Permission Check: Admin can delete anything, Users only their own
  const isOwner = review.userId === userId;
  const isAdmin = role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      status.FORBIDDEN,
      "You do not have permission to delete this review.",
    );
  }

  // 2. Transactional Soft Delete
  return await prisma.$transaction(async (tx) => {
    const deletedReview = await tx.review.update({
      where: { id: reviewId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: "REJECTED", // Optional: move out of APPROVED to keep counters clean
      },
    });

    // 3. Sync Media Stats: This ensures reviewCount and averageRating update immediately
    // Only sync if the review was actually contributing to the stats
    if (review.status === ReviewStatus.APPROVED) {
      await syncMediaStats(review.mediaId, tx);
    }

    return deletedReview;
  });
};

export const ReviewService = {
  createReviewInDB,
  updateReviewInDB,
  updateReviewStatus,
  toggleLikeInDB,
  getAllReviewsFromDB,
  syncMediaStats,
  reportReviewInDB,
  getReportedReviewsFromDB,
  deleteReviewFromDB,
};
