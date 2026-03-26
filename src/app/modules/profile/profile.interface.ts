import { SubscriptionType } from "../../../generated/prisma/enums";

export interface IUserProfileStats {
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

export interface IAdminDashboardStats {
  platform: {
    totalUsers: number;
    totalPremiumUsers: number;
    totalMedia: number;
    totalRevenue: number; // Sum of successful payments
  };
  engagement: {
    totalReviews: number;
    pendingReviews: number;
    activeSubscriptions: number;
  };
  topContent: {
    mostWatched: { title: string; views: number } | null;
    highestRated: { title: string; rating: number } | null;
  };
}
