import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { WatchlistService } from "./watchlist.service";
import status from "http-status";

const toggleWatchlist = catchAsync(async (req: Request, res: Response) => {
  const { mediaId } = req.params as { mediaId: string };
  const result = await WatchlistService.toggleWatchlistInDB(
    req.user.id,
    mediaId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: result.added ? "Added to watchlist" : "Removed from watchlist",
    data: result,
  });
});

const getMyWatchlist = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query; // 🎯 Capture page/limit from URL
  const result = await WatchlistService.getMyWatchlistFromDB(
    req.user.id,
    filters,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Watchlist retrieved successfully",
    meta: result.meta, // 🚀 Now returning metadata
    data: result.data,
  });
});

const checkWatchlistStatus = catchAsync(async (req: Request, res: Response) => {
  const { mediaId } = req.params as { mediaId: string };
  const result = await WatchlistService.checkWatchlistStatus(
    req.user.id,
    mediaId,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Status retrieved successfully",
    data: result,
  });
});

const clearWatchlist = catchAsync(async (req: Request, res: Response) => {
  await WatchlistService.clearWatchlistInDB(req.user.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Watchlist cleared successfully",
    data: null,
  });
});

export const WatchlistController = {
  toggleWatchlist,
  getMyWatchlist,
  checkWatchlistStatus,
  clearWatchlist,
};
