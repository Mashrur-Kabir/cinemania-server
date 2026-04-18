/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import { ActivityService } from "../activity/activity.service";
import {
  ActivityAction,
  NotificationType,
} from "../../../generated/prisma/enums";
import { NotificationService } from "../notification/notification.service";
import { AchievementService } from "../achievement/achievement.service";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Follow, Prisma } from "../../../generated/prisma/client";
import {
  followFilterableFields,
  followSearchableFields,
} from "./follow.constants";

const toggleFollowInDB = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new AppError(status.BAD_REQUEST, "You cannot follow yourself.");
  }

  // 1. Get the target (Recipient)
  const targetUser = await prisma.user.findUnique({
    where: { id: followingId },
  });
  if (!targetUser) throw new AppError(status.NOT_FOUND, "User not found");

  const existingFollow = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } },
  });

  const result = await prisma.$transaction(async (tx) => {
    if (existingFollow) {
      await tx.follow.delete({ where: { id: existingFollow.id } });

      // Activity Log: Unfollow (Still logged for analytics)
      await ActivityService.createLogInDB(
        followerId,
        ActivityAction.UNFOLLOW,
        "User",
        followingId,
        { name: targetUser.name },
        tx,
      );

      return { followed: false };
    } else {
      // --- THE FOLLOW LOGIC ---
      await tx.follow.create({ data: { followerId, followingId } });

      // Activity Log: Public Feed
      await ActivityService.createLogInDB(
        followerId,
        ActivityAction.FOLLOW,
        "User",
        followingId,
        { name: targetUser.name },
        tx,
      );

      // 2. Notification (Private Inbox)
      // We don't need to pass the actor's name here because the Formatter
      // will pull it from the 'actor' relation when the user opens their inbox!
      await NotificationService.createNotificationInDB(
        {
          userId: followingId,
          actorId: followerId,
          type: NotificationType.FOLLOW,
          message: "started following you.", // Fallback/Base message
          link: `/profile/${followerId}`,
        },
        tx,
      );

      return { followed: true };
    }
  });

  // --- Achievement Hooks ---
  if (result.followed) {
    // 1. Check for 'Socialite' milestone for the one who followed
    AchievementService.checkAndAwardBadges(followerId, "SOCIAL").catch((err) =>
      console.error("Follower SOCIAL Badge Error:", err),
    );

    // 2. Check for 'Rising Star' milestone for the one who gained a follower
    AchievementService.checkAndAwardBadges(followingId, "SOCIAL").catch((err) =>
      console.error("Following SOCIAL Badge Error:", err),
    );
  }

  return result;
};

const getFollowersList = async (
  userId: string,
  query: Record<string, any>, // 🎯 Changed unknown to any to satisfy IQueryParams
) => {
  const followerQuery = new QueryBuilder<
    Follow,
    Prisma.FollowWhereInput,
    Prisma.FollowInclude
  >(prisma.follow, query, {
    // 🎯 THE FIX: Pass config here instead of in the methods
    searchableFields: followSearchableFields,
    filterableFields: followFilterableFields,
  })
    .search() // 🎯 No arguments here
    .filter() // 🎯 No arguments here
    .where({ followingId: userId })
    .include({
      follower: {
        select: { id: true, name: true, image: true, role: true },
      },
    })
    .sort()
    .paginate()
    .fields();

  return await followerQuery.execute();
};

const getFollowingList = async (
  userId: string,
  query: Record<string, any>, // 🎯 Changed unknown to any
) => {
  const followingQuery = new QueryBuilder<
    Follow,
    Prisma.FollowWhereInput,
    Prisma.FollowInclude
  >(prisma.follow, query, {
    // 🎯 THE FIX: Pass config here
    searchableFields: followSearchableFields,
    filterableFields: followFilterableFields,
  })
    .search() // 🎯 No arguments here
    .filter() // 🎯 No arguments here
    .where({ followerId: userId })
    .include({
      following: {
        select: { id: true, name: true, image: true, role: true },
      },
    })
    .sort()
    .paginate()
    .fields();

  return await followingQuery.execute();
};

const checkFollowStatus = async (followerId: string, followingId: string) => {
  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });
  return { isFollowing: !!follow };
};

export const FollowService = {
  toggleFollowInDB,
  getFollowersList,
  getFollowingList,
  checkFollowStatus,
};
