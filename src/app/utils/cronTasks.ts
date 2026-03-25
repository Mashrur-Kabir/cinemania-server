import cron from "node-cron";
import { prisma } from "../lib/prisma";
import { logger } from "./logger";

export const initCronTasks = () => {
  // Run every night at midnight
  cron.schedule("0 0 * * *", async () => {
    logger.warn(
      "Running daily database maintenance: Cleaning old activity logs...",
    );

    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const deletedActivity = await prisma.activityLog.deleteMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo, // Delete everything older than 30 days
          },
        },
      });

      logger.success(
        `Cleanup complete. Removed ${deletedActivity.count} old activity logs.`,
      );

      const deletedNotif = await prisma.notification.deleteMany({
        where: {
          isRead: true,
          createdAt: { lt: thirtyDaysAgo }, // Delete READ notifications older than 30 days
        },
      });

      logger.success(
        `Cleanup complete. Removed ${deletedNotif.count} old notifications.`,
      );
    } catch (error) {
      logger.error("Failed to clean up old activity logs:", error);
    }
  });
};
