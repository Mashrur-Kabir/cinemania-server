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
    await syncMediaStats(review.mediaId);
    return review;
  });
};

const toggleLikeInDB = async (userId: string, reviewId: string) => {
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

export const ReviewService = {
  createReviewInDB,
  updateReviewStatus,
  toggleLikeInDB,
  getAllReviewsFromDB,
  syncMediaStats,
  reportReviewInDB,
  getReportedReviewsFromDB,
};
