import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ProfileService } from "./profile.service";

const getMyStats = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getPersonalStatsFromDB(req.user.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Your profile insights fetched",
    data: result,
  });
});

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getUserStatsFromDB(
    req.params.id as string,
    req.user?.id, // Current viewer's ID
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Public profile insights fetched",
    data: result,
  });
});

const getAdminDashboard = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getAdminStatsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin analytics retrieved",
    data: result,
  });
});

export const ProfileController = {
  getUserProfile,
  getMyStats,
  getAdminDashboard,
};
