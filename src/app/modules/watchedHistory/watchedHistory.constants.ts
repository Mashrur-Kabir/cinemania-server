// src/app/modules/watchedHistory/watchedHistory.constants.ts
import { Prisma } from "../../../generated/prisma/client";

export const diarySearchableFields = ["media.title", "notes"];

export const diaryFilterableFields = [
  "isRewatch",
  "isCompleted",
  "mediaId",
  "userId",
];

export const diaryIncludeConfig: Partial<
  Record<
    keyof Prisma.WatchedHistoryInclude,
    Prisma.WatchedHistoryInclude[keyof Prisma.WatchedHistoryInclude]
  >
> = {
  media: {
    select: {
      id: true,
      title: true,
      slug: true,
      releaseYear: true,
      pricing: true,
      posterUrl: true,
    },
  },
};
