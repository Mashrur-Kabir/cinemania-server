import { prisma } from "../../lib/prisma";
import { ActivityAction } from "../../../generated/prisma/enums";
import { Prisma } from "../../../generated/prisma/client";
import { formatActivityLog } from "../../helpers/module.helpers/formatActivityLog";

const createLogInDB = async (
  userId: string,
  action: ActivityAction,
  entity: string,
  entityId: string,
  metadata?: Prisma.InputJsonValue, // Type-safe JSON
  tx?: Prisma.TransactionClient, // Official Transaction Type
) => {
  const client = tx || prisma;
  return await client.activityLog.create({
    data: { userId, action, entity, entityId, metadata },
  });
};

const getFollowingActivityFromDB = async (userId: string, limit = 20) => {
  // 1. Get IDs of people you follow
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  // 2. We ONLY want activity from people you follow.
  // This removes the "seeing too much of myself" issue.
  const followingIds = following.map((f) => f.followingId);

  const logs = await prisma.activityLog.findMany({
    where: {
      userId: { in: followingIds },
    },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return logs.map(formatActivityLog);
};

//cron task:
const cleanupOldLogs = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return await prisma.activityLog.deleteMany({
    where: { createdAt: { lt: thirtyDaysAgo } },
  });
};

export const ActivityService = {
  createLogInDB,
  getFollowingActivityFromDB,
  cleanupOldLogs,
};
