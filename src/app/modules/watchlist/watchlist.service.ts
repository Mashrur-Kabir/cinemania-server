import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import { ActivityService } from "../activity/activity.service";
import { ActivityAction } from "../../../generated/prisma/enums";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Prisma, Watchlist } from "../../../generated/prisma/client";
import {
  watchlistFilterableFields,
  watchlistIncludeConfig,
  watchlistSearchableFields,
} from "./watchlist.constant";

const toggleWatchlistInDB = async (userId: string, mediaId: string) => {
  // 1. Check if media exists (Need title for metadata)
  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  if (!media) throw new AppError(status.NOT_FOUND, "Media not found");

  // 2. Check current status
  const existingEntry = await prisma.watchlist.findUnique({
    where: { userId_mediaId: { userId, mediaId } },
  });

  return await prisma.$transaction(async (tx) => {
    if (existingEntry) {
      // --- REMOVE LOGIC ---
      await tx.watchlist.delete({ where: { id: existingEntry.id } });

      await tx.media.update({
        where: { id: mediaId },
        data: { watchCount: { decrement: 1 } },
      });

      // LOG: Watchlist Remove
      await ActivityService.createLogInDB(
        userId,
        ActivityAction.WATCHLIST_REMOVE,
        "Media",
        mediaId,
        { title: media.title },
        tx,
      );

      return { added: false };
    } else {
      // --- ADD LOGIC ---
      await tx.watchlist.create({
        data: { userId, mediaId },
      });

      await tx.media.update({
        where: { id: mediaId },
        data: { watchCount: { increment: 1 } },
      });

      // LOG: Watchlist Add
      await ActivityService.createLogInDB(
        userId,
        ActivityAction.WATCHLIST_ADD,
        "Media",
        mediaId,
        { title: media.title },
        tx,
      );

      return { added: true };
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMyWatchlistFromDB = async (userId: string, filters: any) => {
  const watchlistQuery = new QueryBuilder<
    Watchlist,
    Prisma.WatchlistWhereInput,
    Prisma.WatchlistInclude
  >(prisma.watchlist, filters, {
    searchableFields: watchlistSearchableFields,
    filterableFields: watchlistFilterableFields,
  });

  const result = await watchlistQuery
    .search()
    .filter()
    .where({ userId }) // 🔒 Enforce ownership
    .dynamicInclude(watchlistIncludeConfig, ["media"])
    .sort() // Defaults to createdAt desc
    .paginate()
    .execute();

  return result;
};

/**
 * Checks if a specific media is in the user's watchlist.
 * Crucial for the Frontend UI button state (Add vs Remove).
 */
const checkWatchlistStatus = async (userId: string, mediaId: string) => {
  const entry = await prisma.watchlist.findUnique({
    where: {
      userId_mediaId: { userId, mediaId },
    },
  });

  return { isWatchlisted: !!entry };
};

/**
 * Bulk clear for users who want a fresh start.
 */
const clearWatchlistInDB = async (userId: string) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Get all mediaIds in user's watchlist before deleting
    const list = await tx.watchlist.findMany({
      where: { userId },
      select: { mediaId: true },
    });

    const mediaIds = list.map((item) => item.mediaId);

    // 2. Decrement counters for all these movies
    await tx.media.updateMany({
      where: { id: { in: mediaIds } },
      data: { watchCount: { decrement: 1 } },
    });

    // 3. Delete the records
    return await tx.watchlist.deleteMany({
      where: { userId },
    });
  });
};

export const WatchlistService = {
  toggleWatchlistInDB,
  getMyWatchlistFromDB,
  checkWatchlistStatus,
  clearWatchlistInDB,
};
