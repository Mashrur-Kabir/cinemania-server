import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ReviewService } from "./review.service";
import status from "http-status";

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

export const ReviewController = {
  createReview,
  toggleLike,
  changeStatus,
  reportReview,
  getReports,
};
