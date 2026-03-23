import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { GenreService } from "./genre.service";
import status from "http-status";

const createGenre = catchAsync(async (req: Request, res: Response) => {
  const result = await GenreService.createGenreIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Genre created successfully!",
    data: result,
  });
});

const getAllGenres = catchAsync(async (req: Request, res: Response) => {
  const result = await GenreService.getAllGenresFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Genres retrieved successfully!",
    data: result,
  });
});

const updateGenre = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GenreService.updateGenreInDB(id as string, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Genre updated successfully!",
    data: result,
  });
});

const deleteGenre = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await GenreService.deleteGenreFromDB(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Genre deleted successfully!",
    data: null,
  });
});

export const GenreController = {
  createGenre,
  getAllGenres,
  updateGenre,
  deleteGenre,
};
