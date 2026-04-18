/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../lib/prisma";
import { IReviewFilterOptions, IReviewPayload } from "./review.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import {
  ActivityAction,
  NotificationType,
  ReviewStatus,
  Role,
} from "../../../generated/prisma/enums";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Prisma, Review } from "../../../generated/prisma/client";
import {
  reviewFilterableFields,
  reviewIncludeConfig,
  reviewSearchableFields,
} from "./review.constants";
import { syncMediaStats } from "../../helpers/module.helpers/syncMediaStats";
import { ActivityService } from "../activity/activity.service";
import { NotificationService } from "../notification/notification.service";
import { AchievementService } from "../achievement/achievement.service";

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

  const review = await prisma.$transaction(async (tx) => {
    const createdReview = await tx.review.create({
      data: { ...payload, userId },
    });

    // We need the media title for the log
    const media = await tx.media.findUnique({ where: { id: payload.mediaId } });

    await ActivityService.createLogInDB(
      userId,
      ActivityAction.REVIEW_CREATE,
      "Review",
      createdReview.id,
      {
        mediaTitle: media?.title,
        rating: payload.rating,
      },
      tx,
    );

    return createdReview;
  });

  // --- Achievement Hook ---
  // Trigger 'The Critic' check
  AchievementService.checkAndAwardBadges(userId, "REVIEWING").catch((err) =>
    console.error("Review Creation Badge Error:", err),
  );

  return review;
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
    // 🎯 FIX: Just update the payload. Do not touch the status field.
    const updatedReview = await tx.review.update({
      where: { id: reviewId },
      data: {
        ...payload,
      },
    });

    /**
     * 📊 SYNC STATS:
     * If the review is APPROVED and the rating was changed in the payload,
     * we must re-calculate the movie's average rating.
     */
    if (
      review.status === ReviewStatus.APPROVED &&
      payload.rating !== undefined
    ) {
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
    // 1. Update status and fetch Media title to store in notification 'message'
    const review = await tx.review.update({
      where: { id: reviewId },
      data: { status: newStatus },
      include: { media: { select: { title: true } } },
    });

    // 2. Sync Stats
    await syncMediaStats(review.mediaId, tx);

    // 3. NOTIFICATION: To the author
    const type =
      newStatus === ReviewStatus.APPROVED
        ? NotificationType.REVIEW_APPROVED
        : NotificationType.REVIEW_REJECTED;

    await NotificationService.createNotificationInDB(
      {
        userId: review.userId,
        type,
        message: review.media.title, // We store the title so the formatter can use it
        link: `/dashboard/my-reviews/${reviewId}`,
      },
      tx,
    );

    return review;
  });
};

const toggleLikeInDB = async (userId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review || review.isDeleted)
    throw new AppError(status.NOT_FOUND, "Review not found");

  if (review.status !== ReviewStatus.APPROVED) {
    throw new AppError(
      status.BAD_REQUEST,
      "You can only like approved reviews.",
    );
  }

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
      const updatedReview = await tx.review.update({
        where: { id: reviewId },
        data: { likeCount: { increment: 1 } },
      });

      // 1. Fetch Author for the Activity Log Metadata
      const author = await tx.user.findUnique({
        where: { id: review.userId },
        select: { name: true },
      });

      // 2. ACTIVITY LOG: Public Feed
      await ActivityService.createLogInDB(
        userId,
        ActivityAction.LIKE_REVIEW,
        "Review",
        reviewId,
        {
          authorName: author?.name || "a user",
          mediaId: review.mediaId,
        },
        tx,
      );

      // 3. NOTIFICATION: Only if liking someone else's review
      if (review.userId !== userId) {
        await NotificationService.createNotificationInDB(
          {
            userId: review.userId,
            actorId: userId, // The person who liked it
            type: NotificationType.LIKE_REVIEW,
            message: "liked your review.",
            link: `/dashboard/my-reviews/${reviewId}`,
          },
          tx,
        );
      }

      return updatedReview;
    }
  });
};

const getAllMyReviewsFromDB = async (
  filters: IReviewFilterOptions,
  userRole?: string,
  currentUserId?: string,
) => {
  // 🔒 If no authenticated user, return empty result immediately
  if (!currentUserId) {
    return {
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }

  const baseConditions: Prisma.ReviewWhereInput = {
    isDeleted: false,
  };

  if (userRole !== Role.ADMIN) {
    // 🛡️ Force user isolation — only their own reviews
    baseConditions.userId = currentUserId;

    // ✅ Your intended behaviour: PENDING + APPROVED only (not REJECTED)
    baseConditions.status = {
      in: [ReviewStatus.APPROVED, ReviewStatus.PENDING],
    };

    delete filters.status;
    delete filters.userId;
  } else if (filters.userId) {
    baseConditions.userId = filters.userId;
  }

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
    .where(baseConditions)
    .dynamicInclude(reviewIncludeConfig, ["user", "media", "comments", "likes"])
    .sort()
    .paginate()
    .execute();

  return result;
};

const getApprovedReviewsFromDB = async (
  userId: string,
  filters: IReviewFilterOptions,
) => {
  // 🎯 Hardcoded safety constraints for public access
  const baseConditions: Prisma.ReviewWhereInput = {
    userId,
    status: ReviewStatus.APPROVED,
    isDeleted: false,
  };

  const reviewQuery = new QueryBuilder<
    Review,
    Prisma.ReviewWhereInput,
    Prisma.ReviewInclude
  >(prisma.review, filters, {
    searchableFields: reviewSearchableFields,
    filterableFields: reviewFilterableFields,
  });

  return await reviewQuery
    .search()
    .filter()
    .where(baseConditions)
    .dynamicInclude(reviewIncludeConfig, ["user", "media"])
    .sort()
    .paginate()
    .execute();
};

// Add this to your ReviewService
const getSingleReviewFromDB = async (id: string) => {
  const result = await prisma.review.findUnique({
    where: { id, isDeleted: false },
    include: {
      user: { select: { id: true, name: true, image: true, role: true } },
      media: true,
      likes: true,
      comments: {
        where: { isDeleted: false },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!result) throw new AppError(status.NOT_FOUND, "Review not found");

  // 🎯 Tree Logic: Convert flat comments array into a nested structure
  const commentMap: Record<string, any> = {};
  const commentTree: any[] = [];

  result.comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  result.comments.forEach((comment) => {
    if (comment.parentId) {
      commentMap[comment.parentId]?.replies.push(commentMap[comment.id]);
    } else {
      commentTree.push(commentMap[comment.id]);
    }
  });

  // Replace flat comments with the structured tree
  return { ...result, comments: commentTree };
};

const getAllApprovedPublicReviewsFromDB = async (
  filters: IReviewFilterOptions,
) => {
  const baseConditions: Prisma.ReviewWhereInput = {
    status: ReviewStatus.APPROVED,
    isDeleted: false,
  };

  const reviewQuery = new QueryBuilder<
    Review,
    Prisma.ReviewWhereInput,
    Prisma.ReviewInclude
  >(prisma.review, filters, {
    searchableFields: reviewSearchableFields,
    filterableFields: reviewFilterableFields,
  });

  return await reviewQuery
    .search()
    .filter()
    .where(baseConditions)
    .dynamicInclude(reviewIncludeConfig, ["user", "media"])
    .sort()
    .paginate()
    .execute();
};

const reportReviewInDB = async (
  userId: string,
  reviewId: string,
  reason: string,
) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new AppError(status.NOT_FOUND, "Review not found");

  return await prisma.$transaction(async (tx) => {
    const report = await tx.reviewReport.create({
      data: { userId, reviewId, reason },
    });

    // 1. NOTIFICATION: Fetch all Admins to alert them
    const admins = await tx.user.findMany({
      where: { role: Role.ADMIN, isDeleted: false },
      select: { id: true },
    });

    const notificationPromises = admins.map((admin) =>
      NotificationService.createNotificationInDB(
        {
          userId: admin.id,
          actorId: userId, // The reporter
          type: NotificationType.REPORT_ALERT,
          message: reason, // Store reason for the admin to see in their inbox
          link: `/admin/reports`,
        },
        tx,
      ),
    );

    await Promise.all(notificationPromises);
    return report;
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
        status: ReviewStatus.REJECTED, // Optional: move out of APPROVED to keep counters clean
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
  getAllMyReviewsFromDB,
  getApprovedReviewsFromDB,
  getAllApprovedPublicReviewsFromDB,
  getSingleReviewFromDB,
  syncMediaStats,
  reportReviewInDB,
  getReportedReviewsFromDB,
  deleteReviewFromDB,
};
