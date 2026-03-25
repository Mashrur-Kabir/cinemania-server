import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ActivityService } from "./activity.service";
import status from "http-status";

const getFollowingFeed = catchAsync(async (req: Request, res: Response) => {
  // We extract the limit from the validated query
  const limit = Number(req.query.limit) || 20;

  const result = await ActivityService.getFollowingActivityFromDB(
    req.user.id,
    limit,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Social feed retrieved successfully",
    data: result,
  });
});

export const ActivityController = {
  getFollowingFeed,
};
