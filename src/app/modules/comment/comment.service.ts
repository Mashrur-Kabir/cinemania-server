import { prisma } from "../../lib/prisma";
import { ICommentPayload } from "./comment.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import {
  NotificationType,
  ReviewStatus,
} from "../../../generated/prisma/enums";
import { NotificationService } from "../notification/notification.service";

const createCommentInDB = async (userId: string, payload: ICommentPayload) => {
  // 1. Logic Guard: Ensure the target Review is APPROVED and not deleted
  const review = await prisma.review.findUnique({
    where: { id: payload.reviewId },
    include: { media: { select: { title: true } } },
  });

  if (!review || review.isDeleted) {
    throw new AppError(status.NOT_FOUND, "Review not found.");
  }

  if (review.status !== ReviewStatus.APPROVED) {
    throw new AppError(
      status.BAD_REQUEST,
      "You cannot comment on a review that hasn't been approved yet.",
    );
  }

  // 2. Logic Guard: If it's a reply, ensure parent exists
  if (payload.parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: payload.parentId },
    });
    if (!parentComment || parentComment.isDeleted) {
      throw new AppError(
        status.NOT_FOUND,
        "The comment you are replying to no longer exists.",
      );
    }
    // Prevent replying to a comment in a different review thread
    if (parentComment.reviewId !== payload.reviewId) {
      throw new AppError(
        status.BAD_REQUEST,
        "Parent comment belongs to a different review.",
      );
    }
  }

  return await prisma.$transaction(async (tx) => {
    const comment = await tx.comment.create({
      data: { ...payload, userId },
    });

    await tx.review.update({
      where: { id: payload.reviewId },
      data: { commentCount: { increment: 1 } },
    });

    const notifiedUserIds = new Set<string>(); // Keep track of who we already pinged

    // Scenario A: Reply to a comment
    if (payload.parentId) {
      const parentComment = await tx.comment.findUnique({
        where: { id: payload.parentId },
      });

      if (parentComment && parentComment.userId !== userId) {
        await NotificationService.createNotificationInDB(
          {
            userId: parentComment.userId,
            actorId: userId,
            type: NotificationType.COMMENT_REPLY,
            message: "replied to your comment.",
            link: `/reviews/${payload.reviewId}`,
          },
          tx,
        );

        notifiedUserIds.add(parentComment.userId); // Mark as notified
      }
    }

    // Scenario B: Direct comment on Review
    // Only notify if they aren't the actor AND weren't already notified as a parent
    if (review.userId !== userId && !notifiedUserIds.has(review.userId)) {
      await NotificationService.createNotificationInDB(
        {
          userId: review.userId,
          actorId: userId,
          type: NotificationType.COMMENT_ADD,
          message: review.media.title,
          link: `/reviews/${payload.reviewId}`,
        },
        tx,
      );
    }

    return comment;
  });
};

const updateCommentInDB = async (
  userId: string,
  commentId: string,
  content: string,
) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  // Industry Standard: Admins should NOT edit user content, only delete it.
  if (!comment || comment.userId !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      "You can only edit your own comments.",
    );
  }

  if (comment.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "Cannot edit a deleted comment.");
  }

  return await prisma.comment.update({
    where: { id: commentId },
    data: { content, isEdited: true },
  });
};

const deleteCommentFromDB = async (
  userId: string,
  role: string,
  commentId: string,
) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment) {
    throw new AppError(status.NOT_FOUND, "Comment not found.");
  }

  // 3. Permission Fix: Allow Owner OR Admin
  const isOwner = comment.userId === userId;
  const isAdmin = role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new AppError(
      status.FORBIDDEN,
      "You do not have permission to delete this comment.",
    );
  }

  return await prisma.comment.update({
    where: { id: commentId },
    data: {
      isDeleted: true,
      content: "[This comment has been deleted]",
      deletedAt: new Date(),
    },
  });
};

export const CommentService = {
  createCommentInDB,
  updateCommentInDB,
  deleteCommentFromDB,
};
