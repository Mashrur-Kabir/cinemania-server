import { prisma } from "../../lib/prisma";
import { IMediaFilterOptions, IMediaPayload } from "./media.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import slugify from "slugify";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Media, Prisma } from "../../../generated/prisma/client";
import {
  mediaFilterableFields,
  mediaIncludeConfig,
  mediaSearchableFields,
} from "./media.constant";

const createMediaIntoDB = async (payload: IMediaPayload) => {
  const { genreIds, ...mediaData } = payload;

  // 1. Generate unique slug
  const slug = slugify(`${mediaData.title}-${mediaData.releaseYear}`, {
    lower: true,
    strict: true,
  });

  const isSlugExist = await prisma.media.findUnique({ where: { slug } });
  if (isSlugExist)
    throw new AppError(
      status.CONFLICT,
      "A similar movie entry already exists.",
    );

  // 2. Transaction to create Media and link Genres
  return await prisma.$transaction(async (tx) => {
    const media = await tx.media.create({
      data: {
        ...mediaData,
        slug,
        genres: {
          create: genreIds.map((id) => ({ genreId: id })),
        },
      },
      include: { genres: { include: { genre: true } } },
    });
    return media;
  });
};

const updateProgressInDB = async (
  userId: string,
  mediaId: string,
  payload: { lastPosition: number; duration: number },
) => {
  const { lastPosition, duration } = payload;

  // Logic: Mark as completed if they've watched more than 95%
  const isCompleted = lastPosition / duration > 0.95;

  return await prisma.watchedHistory.upsert({
    where: {
      // Note: You may need a unique constraint in Prisma
      // or findFirst then update if you allow multiple diary entries
      id:
        (
          await prisma.watchedHistory.findFirst({
            where: { userId, mediaId, isCompleted: false },
          })
        )?.id || "new-uuid",
    },
    update: {
      lastPosition,
      duration,
      isCompleted,
    },
    create: {
      userId,
      mediaId,
      lastPosition,
      duration,
      isCompleted,
    },
  });
};

const getAllMediaFromDB = async (filters: IMediaFilterOptions) => {
  // 1. Initialize QueryBuilder with the model, raw filters, and config constants
  const mediaQuery = new QueryBuilder<
    Media, // Replace 'any' with your Media type
    Prisma.MediaWhereInput,
    Prisma.MediaInclude
  >(prisma.media, filters, {
    searchableFields: mediaSearchableFields,
    filterableFields: mediaFilterableFields,
  });

  // 2. Chain methods
  const result = await mediaQuery
    .search()
    .filter()
    .where({ isDeleted: false }) // Move fixed conditions here to avoid type errors
    .dynamicInclude(mediaIncludeConfig)
    .sort()
    .paginate()
    .fields()
    .execute(); // .execute() returns { data, meta }

  // 3. Return the result directly
  return result;
};

const getSingleMediaBySlug = async (slug: string) => {
  const result = await prisma.media.findUnique({
    where: { slug, isDeleted: false },
    include: {
      genres: { include: { genre: true } },
      reviews: {
        where: { status: "APPROVED", isDeleted: false },
        include: { user: true },
        take: 10, // Preview last 10 reviews
      },
    },
  });

  if (!result) throw new AppError(status.NOT_FOUND, "Media not found");

  // Increment view count in background (non-blocking)
  prisma.media
    .update({
      where: { id: result.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch((err) => console.error("Counter update failed", err));

  return result;
};

const updateMediaInDB = async (id: string, payload: Partial<IMediaPayload>) => {
  const { genreIds, ...mediaData } = payload;

  return await prisma.$transaction(async (tx) => {
    // 1. If title/year changes, update slug (Optional, but keeps SEO clean)
    let slug;
    if (mediaData.title && mediaData.releaseYear) {
      slug = slugify(`${mediaData.title}-${mediaData.releaseYear}`, {
        lower: true,
        strict: true,
      });
    }

    const updatedMedia = await tx.media.update({
      where: { id },
      data: {
        ...mediaData,
        ...(slug && { slug }),
        // Syncing genres: remove all old ones, add new ones
        ...(genreIds && {
          genres: {
            deleteMany: {},
            create: genreIds.map((gId) => ({ genreId: gId })),
          },
        }),
      },
      include: { genres: { include: { genre: true } } },
    });

    return updatedMedia;
  });
};

const deleteMediaFromDB = async (id: string) => {
  return await prisma.media.update({
    where: { id },
    data: { isDeleted: true, deletedAt: new Date() },
  });
};

const getMediaStreamById = async (id: string) => {
  const media = await prisma.media.findUnique({
    where: { id, isDeleted: false },
    select: {
      id: true,
      title: true,
      streamingUrl: true,
      pricing: true,
    },
  });

  if (!media) throw new AppError(status.NOT_FOUND, "Media not found");

  // Security Note: In a real production app, you might generate a
  // signed CloudFront/S3 URL here instead of returning a raw DB string.
  return media;
};

export const MediaService = {
  createMediaIntoDB,
  updateProgressInDB,
  getAllMediaFromDB,
  getSingleMediaBySlug,
  updateMediaInDB,
  deleteMediaFromDB,
  getMediaStreamById,
};
