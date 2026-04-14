// src/app/modules/watchlist/watchlist.constants.ts
import { Prisma } from "../../../generated/prisma/client";

export const watchlistSearchableFields = ["media.title"];

export const watchlistFilterableFields = ["mediaId", "userId"];

export const watchlistIncludeConfig: Partial<
  Record<
    keyof Prisma.WatchlistInclude,
    Prisma.WatchlistInclude[keyof Prisma.WatchlistInclude]
  >
> = {
  media: {
    select: {
      id: true,
      title: true,
      slug: true,
      releaseYear: true,
      averageRating: true,
      pricing: true,
      posterUrl: true,
    },
  },
};
