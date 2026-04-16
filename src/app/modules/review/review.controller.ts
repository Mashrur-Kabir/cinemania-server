import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ReviewService } from "./review.service";
import status from "http-status";
import { IReviewFilterOptions } from "./review.interface";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await ReviewService.createReviewInDB(userId, req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Review submitted! It will appear after moderation.",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await ReviewService.updateReviewInDB(
    req.user.id,
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message:
      "Review updated! It will be re-moderated if it was previously approved.",
    data: result,
  });
});

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.toggleLikeInDB(
    req.user.id,
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Action successful",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query as unknown as IReviewFilterOptions;

  // Use optional chaining in case guests (unauthenticated) can also view reviews
  const userRole = req.user?.role;
  const currentUserId = req.user?.id; // Assumes your auth middleware attaches 'id' to req.user

  const result = await ReviewService.getAllReviewsFromDB(
    filters,
    userRole,
    currentUserId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reviews retrieved successfully!",
    meta: result.meta, // Contains pagination info from QueryBuilder
    data: result.data,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getSingleReviewFromDB(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review details retrieved",
    data: result,
  });
});

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.updateReviewStatus(
    req.params.id as string,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Review status updated to ${req.body.status}`,
    data: result,
  });
});

const reportReview = catchAsync(async (req: Request, res: Response) => {
  const { reason } = req.body;
  const result = await ReviewService.reportReviewInDB(
    req.user.id,
    req.params.id as string,
    reason,
  );

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Thank you. This review has been flagged for moderation.",
    data: result,
  });
});

const getReports = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReportedReviewsFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reports retrieved successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { id: userId, role } = req.user; // Extracted from authMiddleware

  await ReviewService.deleteReviewFromDB(userId, role, id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review deleted successfully and media stats updated!",
    data: null,
  });
});

export const ReviewController = {
  createReview,
  updateReview,
  toggleLike,
  changeStatus,
  getAllReviews,
  getSingleReview,
  reportReview,
  getReports,
  deleteReview,
};
