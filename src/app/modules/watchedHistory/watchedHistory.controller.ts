import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { WatchedHistoryService } from "./watchedHistory.service";
import status from "http-status";

const logMovie = catchAsync(async (req: Request, res: Response) => {
  const result = await WatchedHistoryService.logToHistoryInDB(
    req.user.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Movie logged to your diary!",
    data: result,
  });
});

const getMyDiary = catchAsync(async (req: Request, res: Response) => {
  const result = await WatchedHistoryService.getUserDiaryFromDB(req.user.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Diary retrieved successfully",
    data: result,
  });
});

const updateLog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await WatchedHistoryService.updateHistoryInDB(
    req.user.id,
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Diary entry updated!",
    data: result,
  });
});

const getStats = catchAsync(async (req: Request, res: Response) => {
  const result = await WatchedHistoryService.getPersonalStatsFromDB(
    req.user.id,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Your movie stats retrieved!",
    data: result,
  });
});

const deleteLog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  // We pass the user's ID and Role to the service for the security check
  await WatchedHistoryService.deleteHistoryFromDB(
    req.user.id,
    req.user.role,
    id,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Diary entry deleted successfully",
    data: null,
  });
});

export const WatchedHistoryController = {
  logMovie,
  getMyDiary,
  updateLog,
  getStats,
  deleteLog,
};
