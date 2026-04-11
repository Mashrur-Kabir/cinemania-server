/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../lib/prisma";
import { NotificationType } from "../../../generated/prisma/enums";
import { NotificationService } from "../notification/notification.service";
import { IBadgeCriteria } from "./achievement.interface";

const getAllBadgesWithUserStatus = async (userId: string) => {
  const [allBadges, userBadges] = await Promise.all([
    prisma.badge.findMany({ orderBy: { category: "asc" } }),
    prisma.userBadge.findMany({ where: { userId } }),
  ]);

  const earnedBadgeIds = new Set(userBadges.map((ub) => ub.badgeId));

  return allBadges.map((badge) => ({
    ...badge,
    isEarned: earnedBadgeIds.has(badge.id),
    earnedAt:
      userBadges.find((ub) => ub.badgeId === badge.id)?.earnedAt || null,
  }));
};

const checkAndAwardBadges = async (
  userId: string,
  category: string,
): Promise<void> => {
  // 1. Fetch all badges the user DOES NOT have in this category
  const unearnedBadges = await prisma.badge.findMany({
    where: {
      category,
      users: { none: { userId } },
    },
  });

  for (const badge of unearnedBadges) {
    const isEligible = await evaluateCriteria(
      userId,
      badge.criteria as unknown as IBadgeCriteria,
    );

    if (isEligible) {
      await prisma.$transaction(async (tx) => {
        await tx.userBadge.create({
          data: { userId, badgeId: badge.id },
        });

        // 2. Notify the user of their new status
        await NotificationService.createNotificationInDB(
          {
            userId,
            type: NotificationType.SYSTEM_ANNOUNCEMENT,
            message: `🏆 Achievement Unlocked: ${badge.name}!`,
            link: `/profile/achievements`,
          },
          tx,
        );
      });
    }
  }
};

const evaluateCriteria = async (
  userId: string,
  criteria: IBadgeCriteria,
): Promise<boolean> => {
  const { type, value } = criteria;

  // Use curly braces {} in switch cases to prevent ESLint lexical declaration errors
  switch (type) {
    case "WATCH_COUNT": {
      const count = await prisma.watchedHistory.count({ where: { userId } });
      return count >= value;
    }

    case "GENRE_COUNT": {
      const genreCount = await prisma.watchedHistory.count({
        where: {
          userId,
          media: { genres: { some: { genre: { name: criteria.genreName } } } },
        },
      });
      return genreCount >= value;
    }

    case "FOLLOWER_COUNT": {
      const followers = await prisma.follow.count({
        where: { followingId: userId },
      });
      return followers >= value;
    }

    case "FOLLOWING_COUNT": {
      const following = await prisma.follow.count({
        where: { followerId: userId },
      });
      return following >= value;
    }

    case "REVIEW_COUNT": {
      const reviews = await prisma.review.count({ where: { userId } });
      return reviews >= value;
    }

    case "COMPLETIONIST": {
      // Logic: Finish 50 movies to 100% progress
      const completedCount = await prisma.watchedHistory.count({
        where: { userId, isCompleted: true },
      });
      return completedCount >= value;
    }

    case "REWATCH_KING": {
      // Logic: Count rewatch flags
      const rewatchCount = await prisma.watchedHistory.count({
        where: { userId, isRewatch: true },
      });
      return rewatchCount >= value;
    }

    case "MARATHONER": {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const dayCount = await prisma.watchedHistory.count({
        where: { userId, createdAt: { gte: twentyFourHoursAgo } },
      });
      return dayCount >= value;
    }

    case "NIGHT_OWL": {
      const nightWatches = await prisma.watchedHistory.findMany({
        where: { userId },
        select: { createdAt: true },
        take: 100, // Sample last 100
      });
      const count = nightWatches.filter((w) => {
        const hour = w.createdAt.getHours();
        return hour >= 0 && hour <= 5;
      }).length;
      return count >= value;
    }

    case "SUBSCRIPTION_TIER": {
      const sub = await prisma.subscription.findFirst({
        where: { userId, isActive: true, type: criteria.tier as any },
      });
      return !!sub;
    }

    default:
      return false;
  }
};

export const AchievementService = {
  checkAndAwardBadges,
  getAllBadgesWithUserStatus,
};
