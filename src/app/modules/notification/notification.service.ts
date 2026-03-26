import { prisma } from "../../lib/prisma";
import { NotificationType, Prisma } from "../../../generated/prisma/client";
import { formatNotification } from "../../helpers/module.helpers/formatNotification";

/**
 * Internal Utility: Create a notification
 * To be called inside FollowService, ReviewService, etc.
 */
const createNotificationInDB = async (
  data: {
    userId: string;
    actorId?: string;
    type: NotificationType;
    message: string;
    link?: string;
  },
  tx?: Prisma.TransactionClient,
) => {
  const client = tx || prisma;
  return await client.notification.create({
    data,
  });
};

/**
 * Get User's Inbox
 */
const getUserNotificationsFromDB = async (userId: string, limit = 20) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    include: {
      actor: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return notifications.map(formatNotification);
};

/**
 * Mark as Read
 */
const markAsReadInDB = async (userId: string, notificationId: string) => {
  return await prisma.notification.update({
    where: { id: notificationId, userId }, // Ensure user owns the notification
    data: { isRead: true },
  });
};

/**
 * Mark All as Read (Bulk)
 */
const markAllAsReadInDB = async (userId: string) => {
  return await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
};

const getUnreadCountFromDB = async (userId: string) => {
  return await prisma.notification.count({
    where: { userId, isRead: false },
  });
};

//cron task:
const cleanupOldReadNotifications = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return await prisma.notification.deleteMany({
    where: {
      isRead: true,
      createdAt: { lt: thirtyDaysAgo },
    },
  });
};

export const NotificationService = {
  createNotificationInDB,
  getUserNotificationsFromDB,
  markAsReadInDB,
  markAllAsReadInDB,
  getUnreadCountFromDB,
  cleanupOldReadNotifications,
};
