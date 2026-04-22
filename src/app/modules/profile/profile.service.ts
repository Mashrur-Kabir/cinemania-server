import { prisma } from "../../lib/prisma";
import { PaymentStatus, ReviewStatus } from "../../../generated/prisma/enums";
import {
  IUserProfileStats,
  IAdminStats,
  IAdminProfileStats,
} from "./profile.interface";
import { AppError } from "../../errors/AppError";
import status from "http-status";

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

const getAdminStatsFromDB = async (): Promise<IAdminStats> => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    users,
    premiumUsers,
    media,
    revenueAgg,
    subscriptions,
    reviews,
    pendingReviews,
    rawRevenueData,
    topMedia,
  ] = await Promise.all([
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.subscription.count({ where: { type: "PREMIUM", isActive: true } }),
    prisma.media.count({ where: { isDeleted: false } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: PaymentStatus.PAID },
    }),
    prisma.subscription.count({ where: { isActive: true } }),
    prisma.review.count(),
    prisma.review.count({ where: { status: ReviewStatus.PENDING } }),
    prisma.payment.findMany({
      where: { status: PaymentStatus.PAID, createdAt: { gte: thirtyDaysAgo } },
      select: { amount: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.media.findFirst({
      where: { isDeleted: false },
      orderBy: { watchCount: "desc" },
      select: { title: true, watchCount: true },
    }),
  ]);

  // 📈 Process Time-Series Revenue Data
  const revenueMap: Record<string, number> = {};
  rawRevenueData.forEach((p) => {
    const date = p.createdAt.toISOString().split("T")[0];
    revenueMap[date] = (revenueMap[date] || 0) + p.amount;
  });

  const revenueData = Object.entries(revenueMap).map(([date, amount]) => ({
    date,
    amount: parseFloat(amount.toFixed(2)),
  }));

  return {
    platform: {
      totalUsers: users,
      totalPremiumUsers: premiumUsers,
      totalMedia: media,
      totalRevenue: parseFloat((revenueAgg._sum.amount || 0).toFixed(2)),
    },
    engagement: {
      totalReviews: reviews,
      pendingReviewsCount: pendingReviews,
      activeSubscriptions: subscriptions,
    },
    topContent: {
      mostWatched: topMedia
        ? { title: topMedia.title, views: topMedia.watchCount }
        : null,
      highestRated: null, // Logic can follow mostWatched pattern
    },
    revenueData,
    growthRate: 12.5, // Placeholder for calculated growth logic
  };
};

// Add to src/app/modules/profile/profile.service.ts

const getAdminProfileFromDB = async (
  adminId: string,
): Promise<IAdminProfileStats> => {
  const admin = await prisma.user.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new AppError(status.FORBIDDEN, "Invalid clearance level.");
  }

  // Aggregate current operational queue
  const [pendingReviews, activeUsers, reportedReviews] = await Promise.all([
    prisma.review.count({ where: { status: ReviewStatus.PENDING } }),
    prisma.user.count({ where: { status: "ACTIVE", isDeleted: false } }),
    prisma.reviewReport.count(),
  ]);

  return {
    user: admin,
    systemAccess: {
      clearanceLevel: "OMEGA-TIER", // Thematic flavor
      grantedAt: admin.createdAt,
      modulesActive: 5, // Media, Users, Genres, Reports, Overview
    },
    actionQueue: {
      pendingModerations: pendingReviews,
      activeUsers,
      reportedReviews,
    },
  };
};

export const ProfileService = {
  getUserStatsFromDB,
  getPersonalStatsFromDB,
  getAdminStatsFromDB,
  getAdminProfileFromDB,
};
