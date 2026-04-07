import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import { IWatchedHistoryPayload } from "./watchedHistory.interface";
import { parseWatchedAt } from "../../helpers/module.helpers/parseWatchedAt";
import { ActivityService } from "../activity/activity.service";
import {
  ActivityAction,
  NotificationType,
} from "../../../generated/prisma/enums";
import { NotificationService } from "../notification/notification.service";
import { AchievementService } from "../achievement/achievement.service";

const logToHistoryInDB = async (
  userId: string,
  payload: IWatchedHistoryPayload,
) => {
  const { mediaId, watchedAt, notes, isRewatch } = payload;

  // 1. Verify Media exists
  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  if (!media) throw new AppError(status.NOT_FOUND, "Media not found");

  const result = await prisma.$transaction(async (tx) => {
    const historyEntry = await tx.watchedHistory.create({
      data: {
        userId,
        mediaId,
        watchedAt: parseWatchedAt(watchedAt as string),
        notes,
        isRewatch: isRewatch || false,
      },
    });

    await tx.media.update({
      where: { id: mediaId },
      data: { viewCount: { increment: 1 } },
    });

    // 1. ACTIVITY LOG: For the public following feed
    await ActivityService.createLogInDB(
      userId,
      ActivityAction.DIARY_LOG,
      "Media",
      mediaId,
      { title: media.title },
      tx,
    );

    /**
     * 2. BROADCAST NOTIFICATION: To all followers
     */
    const followers = await tx.follow.findMany({
      where: { followingId: userId },
      select: { followerId: true },
    });

    if (followers.length > 0) {
      const notificationPromises = followers.map((f) =>
        NotificationService.createNotificationInDB(
          {
            userId: f.followerId, // The recipient
            actorId: userId, // The person who watched (Actor)
            type: NotificationType.WATCHED_MEDIA,
            message: media.title, // Formatter uses this for the movie title
            link: `/media/${media.id}`,
          },
          tx,
        ),
      );

      await Promise.all(notificationPromises);
    }

    return historyEntry;
  });

  // --- Achievement Hook ---
  // We check for Volume (Total) and Genre milestones
  AchievementService.checkAndAwardBadges(userId, "VOLUME").catch((err) =>
    console.error("Volume Badge Error:", err),
  );
  AchievementService.checkAndAwardBadges(userId, "GENRE").catch((err) =>
    console.error("Genre Badge Error:", err),
  );

  return result;
};

const getUserDiaryFromDB = async (userId: string) => {
  return await prisma.watchedHistory.findMany({
    where: { userId },
    include: {
      media: {
        select: {
          title: true,
          slug: true,
          releaseYear: true,
          pricing: true,
          posterUrl: true,
        },
      },
    },
    orderBy: { watchedAt: "desc" },
  });
};

const updateHistoryInDB = async (
  userId: string,
  historyId: string,
  payload: Partial<IWatchedHistoryPayload>,
) => {
  const history = await prisma.watchedHistory.findUnique({
    where: { id: historyId },
  });

  if (!history) throw new AppError(status.NOT_FOUND, "Entry not found");
  if (history.userId !== userId)
    throw new AppError(status.FORBIDDEN, "Unauthorized");

  return await prisma.watchedHistory.update({
    where: { id: historyId },
    data: {
      ...payload,
      watchedAt: payload.watchedAt
        ? new Date(payload.watchedAt)
        : history.watchedAt,
    },
  });
};

const getPersonalStatsFromDB = async (userId: string) => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 1. Total watches & Watches this month
  const totalCount = await prisma.watchedHistory.count({ where: { userId } });
  const monthCount = await prisma.watchedHistory.count({
    where: {
      userId,
      watchedAt: { gte: firstDayOfMonth },
    },
  });

  // 2. Genre Breakdown (Requires joining Media and Genre)
  const genreStats = await prisma.watchedHistory.findMany({
    where: { userId },
    include: {
      media: {
        include: { genres: { include: { genre: true } } },
      },
    },
  });

  // Simple aggregation for "Top Genre"
  const genreMap: Record<string, number> = {};
  genreStats.forEach((entry) => {
    entry.media.genres.forEach((g) => {
      genreMap[g.genre.name] = (genreMap[g.genre.name] || 0) + 1;
    });
  });

  return {
    totalMoviesWatched: totalCount,
    watchedThisMonth: monthCount,
    genreBreakdown: genreMap,
  };
};

const deleteHistoryFromDB = async (
  userId: string,
  role: string,
  historyId: string,
) => {
  // 1. Find the entry
  const history = await prisma.watchedHistory.findUnique({
    where: { id: historyId },
  });

  if (!history) throw new AppError(status.NOT_FOUND, "Diary entry not found");

  // 2. Authorization Check: Only owner or admin can delete
  if (role !== "ADMIN" && history.userId !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      "You are not authorized to delete this entry",
    );
  }

  return await prisma.$transaction(async (tx) => {
    // 3. Delete the record
    const deletedEntry = await tx.watchedHistory.delete({
      where: { id: historyId },
    });

    // 4. Decrement Media viewCount
    await tx.media.update({
      where: { id: history.mediaId },
      data: { viewCount: { decrement: 1 } },
    });

    return deletedEntry;
  });
};

export const WatchedHistoryService = {
  logToHistoryInDB,
  getUserDiaryFromDB,
  updateHistoryInDB,
  getPersonalStatsFromDB,
  deleteHistoryFromDB,
};
