import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import status from "http-status";

const toggleFollowInDB = async (followerId: string, followingId: string) => {
  // 1. Guard: Prevent self-following
  if (followerId === followingId) {
    throw new AppError(status.BAD_REQUEST, "You cannot follow yourself.");
  }

  // 2. Check if target user exists
  const targetUser = await prisma.user.findUnique({
    where: { id: followingId },
  });
  if (!targetUser) throw new AppError(status.NOT_FOUND, "User not found");

  // 3. Toggle Logic
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId },
    },
  });

  if (existingFollow) {
    await prisma.follow.delete({ where: { id: existingFollow.id } });
    return { followed: false };
  } else {
    await prisma.follow.create({
      data: { followerId, followingId },
    });
    return { followed: true };
  }
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
