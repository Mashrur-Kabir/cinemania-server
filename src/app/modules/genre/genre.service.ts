import { prisma } from "../../lib/prisma";
import { IGenrePayload } from "./genre.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";

const createGenreIntoDB = async (payload: IGenrePayload) => {
  const isExist = await prisma.genre.findUnique({
    where: { name: payload.name },
  });

  if (isExist) {
    throw new AppError(status.CONFLICT, "This genre already exists!");
  }

  return await prisma.genre.create({
    data: payload,
  });
};

const getAllGenresFromDB = async () => {
  return await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });
};

const updateGenreInDB = async (id: string, payload: IGenrePayload) => {
  const isExist = await prisma.genre.findUnique({ where: { id } });
  if (!isExist) throw new AppError(status.NOT_FOUND, "Genre not found!");

  return await prisma.genre.update({
    where: { id },
    data: payload,
  });
};

const deleteGenreFromDB = async (id: string) => {
  const isExist = await prisma.genre.findUnique({ where: { id } });
  if (!isExist) throw new AppError(status.NOT_FOUND, "Genre not found!");

  return await prisma.genre.delete({
    where: { id },
  });
};

export const GenreService = {
  createGenreIntoDB,
  getAllGenresFromDB,
  updateGenreInDB,
  deleteGenreFromDB,
};
