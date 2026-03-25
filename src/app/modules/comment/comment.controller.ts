import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CommentService } from "./comment.service";
import status from "http-status";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.createCommentInDB(req.user.id, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Comment posted successfully!",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { content } = req.body;

  const result = await CommentService.updateCommentInDB(
    req.user.id,
    id,
    content,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment updated successfully!",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { id: userId, role } = req.user; // Role is essential for Admin moderation

  await CommentService.deleteCommentFromDB(userId, role, id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Comment deleted successfully!",
    data: null,
  });
});

export const CommentController = {
  createComment,
  updateComment,
  deleteComment,
};
