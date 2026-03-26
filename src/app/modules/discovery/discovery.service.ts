import { Pricing } from "../../../generated/prisma/enums";
import { getAllowedTiers } from "../../helpers/module.helpers/getAllowedTiers";
import { prisma } from "../../lib/prisma";
import { IDiscoveryResponse } from "./discovery.interface";

const getHomeDiscoveryFromDB = async (
  userId: string,
): Promise<IDiscoveryResponse> => {
  const userSub = await prisma.subscription.findFirst({
    where: { userId, isActive: true, endDate: { gte: new Date() } },
  });
  const allowedTiers = getAllowedTiers(userSub?.type);

  // Parallel fetch including Continue Watching
  const [trending, recommendations, continueWatching, socialWatchParty] =
    await Promise.all([
      getTrending(allowedTiers),
      getPersonalized(userId, allowedTiers),
      getContinueWatching(userId),
      getSocialWatchParty(userId),
    ]);

  return { trending, recommendations, continueWatching, socialWatchParty };
};

const getTrending = async (allowedTiers: Pricing[]) => {
  return await prisma.media.findMany({
    where: { isDeleted: false, pricing: { in: allowedTiers } },
    orderBy: [
      { watchCount: "desc" },
      { averageRating: "desc" },
      { createdAt: "desc" }, // Prioritize newer popular content
    ],
    take: 10,
    include: { genres: { include: { genre: true } } },
  });
};

const getPersonalized = async (userId: string, allowedTiers: Pricing[]) => {
  const history = await prisma.watchedHistory.findMany({
    where: { userId },
    take: 20,
    orderBy: { watchedAt: "desc" },
    include: { media: { include: { genres: true } } },
  });

  const watchedIds = history.map((h) => h.mediaId);

  // Fallback: Best rated content for new users
  if (history.length === 0) {
    return await prisma.media.findMany({
      where: { isDeleted: false, pricing: { in: allowedTiers } },
      orderBy: { averageRating: "desc" },
      take: 10,
    });
  }

  const genreFreq: Record<string, number> = {};
  history.forEach((h) => {
    h.media.genres.forEach((g) => {
      genreFreq[g.genreId] = (genreFreq[g.genreId] || 0) + 1;
    });
  });

  const topGenres = Object.entries(genreFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([id]) => id);

  return await prisma.media.findMany({
    where: {
      isDeleted: false,
      pricing: { in: allowedTiers },
      id: { notIn: watchedIds },
      genres: { some: { genreId: { in: topGenres } } },
    },
    include: { genres: { include: { genre: true } } },
    orderBy: { averageRating: "desc" },
    take: 10,
  });
};

const getContinueWatching = async (userId: string) => {
  return await prisma.watchedHistory.findMany({
    where: {
      userId,
      isCompleted: false, // Only show what they haven't finished
      lastPosition: { gt: 0 }, // Must have actually started it
    },
    include: {
      media: true,
    },
    orderBy: { updatedAt: "desc" }, // Most recent first
    take: 5,
  });
};

const getSocialWatchParty = async (userId: string) => {
  // 1. Find the list of people the current user is following
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);

  // 2. Define "Real-time" (e.g., updated in the last 5 minutes)
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  // 3. Get recent watch activity from those friends
  return await prisma.watchedHistory.findMany({
    where: {
      userId: { in: followingIds },
      isCompleted: false,
      updatedAt: { gte: fiveMinutesAgo }, // Only show "Live" sessions
    },
    include: {
      media: true,
      user: {
        select: { id: true, name: true, image: true }, // Only public user info
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });
};

export const DiscoveryService = { getHomeDiscoveryFromDB };
