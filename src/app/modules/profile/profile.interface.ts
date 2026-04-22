import {
  Role,
  SubscriptionType,
  UserStatus,
} from "../../../generated/prisma/enums";

export interface IUserProfileStats {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: Role;
    status: UserStatus;
    isFollowing: boolean;
  };
  overview: {
    totalWatched: number;
    totalMinutes: number;
    reviewCount: number;
    followers: number;
    following: number;
  };
  subscription: {
    plan: SubscriptionType | "NONE";
    expiryDate: Date | null;
    isActive: boolean;
  };
  genres: { name: string; count: number; percentage: number }[];
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: Date;
  }[]; // Added for the Trophy Case
  watchActivity: { month: string; count: number }[];
}

/**
 * 🛰️ SYSTEM NEXUS OVERVIEW
 * High-level platform metrics for the Admin Dashboard.
 */
export interface IAdminStats {
  platform: {
    totalUsers: number;
    totalPremiumUsers: number;
    totalMedia: number;
    totalRevenue: number;
  };
  engagement: {
    totalReviews: number;
    pendingReviewsCount: number;
    activeSubscriptions: number;
  };
  topContent: {
    mostWatched: { title: string; views: number } | null;
    highestRated: { title: string; rating: number } | null;
  };
  revenueData: {
    date: string;
    amount: number;
  }[];
  growthRate: number;
}

export interface IAdminProfileStats {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: Role;
    status: UserStatus;
    createdAt: Date;
  };
  systemAccess: {
    clearanceLevel: string;
    grantedAt: Date;
    modulesActive: number;
  };
  actionQueue: {
    pendingModerations: number;
    activeUsers: number;
    reportedReviews: number;
  };
}
