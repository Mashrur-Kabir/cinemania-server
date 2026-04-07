import { Prisma } from "../../../generated/prisma/client";

/**
 * Fields that can be searched using a partial text match.
 * Includes nested genre names for deep search capabilities.
 */
export const mediaSearchableFields = [
  "title",
  "description",
  "director",
  "platform",
  "genres.genre.name",
];

/**
 * Fields used for exact matching or range filtering (e.g., specific year or pricing).
 */
export const mediaFilterableFields = [
  "title",
  "description",
  "releaseYear",
  "platform",
  "pricing",
  "isDeleted",
  "genres.genreId",
  "averageRating",
];

/**
 * Configuration for dynamic inclusion of related data.
 * Optimized to fetch genre details and reviewer profiles while keeping payloads lean.
 */
export const mediaIncludeConfig: Partial<
  Record<
    keyof Prisma.MediaInclude,
    Prisma.MediaInclude[keyof Prisma.MediaInclude]
  >
> = {
  genres: {
    include: {
      genre: true,
    },
  },
  reviews: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  },
  watchlist: true,
};
