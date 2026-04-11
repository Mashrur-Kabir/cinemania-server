// src/app/modules/achievement/achievement.controller.ts
import { Request, Response } from "express";
import { AchievementService } from "./achievement.service";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const getAllAchievements = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await AchievementService.getAllBadgesWithUserStatus(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Trophy catalog retrieved successfully",
    data: result,
  });
});

export const AchievementController = {
  getAllAchievements,
};
