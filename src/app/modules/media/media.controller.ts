import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { MediaService } from "./media.service";
import status from "http-status";
import { IMediaFilterOptions } from "./media.interface";

const createMedia = catchAsync(async (req: Request, res: Response) => {
  const result = await MediaService.createMediaIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Movie/Series entry created successfully!",
    data: result,
  });
});

const updateProgress = catchAsync(async (req: Request, res: Response) => {
  const { id: mediaId } = req.params;
  const result = await MediaService.updateProgressInDB(
    req.user.id,
    mediaId as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Playback progress saved",
    data: result,
  });
});

const getAllMedia = catchAsync(async (req: Request, res: Response) => {
  const result = await MediaService.getAllMediaFromDB(
    req.query as IMediaFilterOptions,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Media library retrieved successfully!",
    meta: result.meta, // Includes pagination info
    data: result.data,
  });
});

const getSingleMedia = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await MediaService.getSingleMediaBySlug(slug as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Media details retrieved successfully!",
    data: result,
  });
});

const updateMedia = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MediaService.updateMediaInDB(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Media entry updated successfully!",
    data: result,
  });
});

const deleteMedia = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await MediaService.deleteMediaFromDB(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Media entry deleted successfully!",
    data: null,
  });
});

const getMediaStream = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MediaService.getMediaStreamById(id as string);

  // LOGIC: If the movie is FREE, we don't strictly need the subscription
  // (though the middleware already checked it).
  // You can add extra tier-based logic here if needed.

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Stream link retrieved successfully",
    data: result,
  });
});

export const MediaController = {
  createMedia,
  updateProgress,
  getAllMedia,
  getSingleMedia,
  updateMedia,
  deleteMedia,
  getMediaStream,
};
