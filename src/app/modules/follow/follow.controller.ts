import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { FollowService } from "./follow.service";
import status from "http-status";

const toggleFollow = catchAsync(async (req: Request, res: Response) => {
  const { userId: followingId } = req.params as { userId: string };
  const result = await FollowService.toggleFollowInDB(req.user.id, followingId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: result.followed ? "User followed" : "User unfollowed",
    data: result,
  });
});

const getFollowers = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  // 🎯 Pass req.query to the service
  const result = await FollowService.getFollowersList(
    userId as string,
    req.query,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Followers retrieved",
    meta: result.meta, // 🎯 Now includes pagination info
    data: result.data,
  });
});

const getFollowing = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  // 🎯 Pass req.query to the service
  const result = await FollowService.getFollowingList(
    userId as string,
    req.query,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Following list retrieved",
    meta: result.meta, // 🎯 Now includes pagination info
    data: result.data,
  });
});

const getFollowStatus = catchAsync(async (req: Request, res: Response) => {
  const { userId: followingId } = req.params as { userId: string };
  const result = await FollowService.checkFollowStatus(
    req.user.id,
    followingId,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Follow status retrieved",
    data: result,
  });
});

export const FollowController = {
  toggleFollow,
  getFollowers,
  getFollowing,
  getFollowStatus,
};
