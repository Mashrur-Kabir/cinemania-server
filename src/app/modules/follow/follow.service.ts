import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import { ActivityService } from "../activity/activity.service";
import {
  ActivityAction,
  NotificationType,
} from "../../../generated/prisma/enums";
import { NotificationService } from "../notification/notification.service";

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

  return await prisma.$transaction(async (tx) => {
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
};

const getFollowersList = async (userId: string) => {
  // Check if the user we are looking up actually exists
  const userExists = await prisma.user.findUnique({ where: { id: userId } });
  if (!userExists) throw new AppError(status.NOT_FOUND, "User not found");

  return await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: { id: true, name: true, image: true, role: true },
      },
    },
  });
};

const getFollowingList = async (userId: string) => {
  return await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: { id: true, name: true, image: true, role: true },
      },
    },
  });
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
