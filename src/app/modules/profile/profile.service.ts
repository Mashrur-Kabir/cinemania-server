import { prisma } from "../../lib/prisma";
import { PaymentStatus, ReviewStatus } from "../../../generated/prisma/enums";
import { IUserProfileStats, IAdminDashboardStats } from "./profile.interface";

const getPersonalStatsFromDB = async (
  userId: string,
): Promise<IUserProfileStats> => {
  // 1. Added userBadges to the parallel fetch
  const [user, sub, history, reviews, userBadges] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: { _count: { select: { followers: true, following: true } } },
    }),
    prisma.subscription.findFirst({
      where: { userId, isActive: true },
      orderBy: { endDate: "desc" },
    }),
    prisma.watchedHistory.findMany({
      where: { userId },
      include: { media: { include: { genres: { include: { genre: true } } } } },
    }),
    prisma.review.count({ where: { userId } }),
    prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true }, // Join with Badge to get details
      orderBy: { earnedAt: "desc" }, // Show newest trophies first
    }),
  ]);

  // Calculate total minutes watched (using playback duration)
  const totalMinutes = history.reduce(
    (acc, curr) => acc + curr.duration / 60,
    0,
  );

  // Genre breakdown logic
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

  // 2. Format the badges for the response
  const badges = userBadges.map((ub) => ({
    id: ub.badge.id,
    name: ub.badge.name,
    description: ub.badge.description,
    icon: ub.badge.icon,
    earnedAt: ub.earnedAt,
  }));

  return {
    overview: {
      totalWatched: history.length,
      totalMinutes: Math.floor(totalMinutes),
      reviewCount: reviews,
      followers: user?._count.followers || 0,
      following: user?._count.following || 0,
    },
    subscription: {
      plan: sub?.type || "NONE",
      expiryDate: sub?.endDate || null,
      isActive: !!sub,
    },
    genres,
    badges, // Included in the return object
    watchActivity: [],
  };
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
  getPersonalStatsFromDB,
  getAdminStatsFromDB,
};
