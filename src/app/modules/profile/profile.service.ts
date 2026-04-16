import { prisma } from "../../lib/prisma";
import { PaymentStatus, ReviewStatus } from "../../../generated/prisma/enums";
import { IUserProfileStats, IAdminDashboardStats } from "./profile.interface";

// 🎯 Reusable Logic for any User ID
const getUserStatsFromDB = async (
  targetUserId: string,
  currentUserId?: string, // Optional: used to check follow status
): Promise<IUserProfileStats> => {
  const [user, sub, history, reviews, userBadges, isFollowing] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: targetUserId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          status: true,
          _count: { select: { followers: true, following: true } },
        },
      }),
      prisma.subscription.findFirst({
        where: { userId: targetUserId, isActive: true },
      }),
      prisma.watchedHistory.findMany({
        where: { userId: targetUserId },
        include: {
          media: { include: { genres: { include: { genre: true } } } },
        },
      }),
      prisma.review.count({
        where: { userId: targetUserId, status: "APPROVED" },
      }),
      prisma.userBadge.findMany({
        where: { userId: targetUserId },
        include: { badge: true },
        orderBy: { earnedAt: "desc" },
      }),
      // 🎯 ADDED: Check if current viewer follows this user
      currentUserId
        ? prisma.follow.findUnique({
            where: {
              followerId_followingId: {
                followerId: currentUserId,
                followingId: targetUserId,
              },
            },
          })
        : null,
    ]);

  if (!user) throw new Error("User not found");

  // ... (Your existing totalMinutes and genreMap logic exactly as it was) ...
  const totalMinutes = history.reduce(
    (acc, curr) => acc + curr.duration / 60,
    0,
  );

  const genreMap: Record<string, number> = {};
  history.forEach((h) =>
    h.media.genres.forEach((g) => {
      genreMap[g.genre.name] = (genreMap[g.genre.name] || 0) + 1;
    }),
  );
  const totalGenreCount = Object.values(genreMap).reduce((a, b) => a + b, 0);
  const genres = Object.entries(genreMap)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalGenreCount) * 100) || 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    user: { ...user, isFollowing: !!isFollowing }, // 🎯 Added follow status
    overview: {
      totalWatched: history.length,
      totalMinutes: Math.floor(totalMinutes),
      reviewCount: reviews,
      followers: user._count.followers,
      following: user._count.following,
    },
    subscription: {
      plan: sub?.type || "NONE",
      expiryDate: sub?.endDate || null,
      isActive: !!sub,
    },
    genres,
    badges: userBadges.map((ub) => ({ ...ub.badge, earnedAt: ub.earnedAt })),
    watchActivity: [],
  };
};

// 🎯 Keep existing getPersonalStats as a wrapper
const getPersonalStatsFromDB = async (userId: string) => {
  return getUserStatsFromDB(userId);
};

const getAdminStatsFromDB = async (): Promise<IAdminDashboardStats> => {
  const [users, media, revenue, subscriptions, reviews] = await Promise.all([
    prisma.user.count(),
    prisma.media.count({ where: { isDeleted: false } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: PaymentStatus.PAID },
    }),
    prisma.subscription.count({ where: { isActive: true } }),
    prisma.review.aggregate({
      _count: { _all: true },
      where: { status: ReviewStatus.PENDING },
    }),
  ]);

  const topMedia = await prisma.media.findFirst({
    where: { isDeleted: false },
    orderBy: { watchCount: "desc" },
    select: { title: true, watchCount: true },
  });

  return {
    platform: {
      totalUsers: users,
      totalPremiumUsers: await prisma.subscription.count({
        where: { type: "PREMIUM", isActive: true },
      }),
      totalMedia: media,
      totalRevenue: revenue._sum.amount || 0,
    },
    engagement: {
      totalReviews: await prisma.review.count(),
      pendingReviews: reviews._count._all,
      activeSubscriptions: subscriptions,
    },
    topContent: {
      mostWatched: topMedia
        ? { title: topMedia.title, views: topMedia.watchCount }
        : null,
      highestRated: null, // Similar query as mostWatched
    },
  };
};

export const ProfileService = {
  getUserStatsFromDB,
  getPersonalStatsFromDB,
  getAdminStatsFromDB,
};
