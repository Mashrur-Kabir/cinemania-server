import { prisma } from "../../lib/prisma";
import { ICommentPayload } from "./comment.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";

const createCommentInDB = async (userId: string, payload: ICommentPayload) => {
  return await prisma.$transaction(async (tx) => {
    const comment = await tx.comment.create({
      data: { ...payload, userId },
    });

    // Update review's comment count
    await tx.review.update({
      where: { id: payload.reviewId },
      data: { commentCount: { increment: 1 } },
    });

    return comment;
  });
};

const updateCommentInDB = async (
  userId: string,
  commentId: string,
  content: string,
) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment || comment.userId !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      "You can only edit your own comments.",
    );
  }

  return await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
};

const deleteCommentFromDB = async (userId: string, commentId: string) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment || comment.userId !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      "You can only delete your own comments.",
    );
  }

  // Soft delete: We keep the record but mark it as deleted to preserve the thread
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
