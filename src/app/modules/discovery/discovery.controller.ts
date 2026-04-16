import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DiscoveryService } from "./discovery.service";

const getDiscoveryFeed = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const query = req.query;

  const result = await DiscoveryService.getDiscoveryFeedFromDB(userId, query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: query.search
      ? "Search results fetched"
      : "Discovery feed generated",
    data: result,
  });
});

export const DiscoveryController = { getDiscoveryFeed };
