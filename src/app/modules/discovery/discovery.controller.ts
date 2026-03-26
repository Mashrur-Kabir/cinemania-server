import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DiscoveryService } from "./discovery.service";

const getDiscoveryFeed = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await DiscoveryService.getHomeDiscoveryFromDB(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Discovery feed generated successfully",
    data: result,
  });
});

export const DiscoveryController = { getDiscoveryFeed };
