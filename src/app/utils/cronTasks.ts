import cron from "node-cron";
import { prisma } from "../lib/prisma";
import { logger } from "./logger";

export const initCronTasks = () => {
  /**
   * 1. DAILY MAINTENANCE (Midnight)
   * Cleanup for Logs and Notifications
   */
  cron.schedule("0 0 * * *", async () => {
    logger.warn("Running daily database maintenance: Cleaning old records...");

    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Cleanup Activity Logs
      const deletedActivity = await prisma.activityLog.deleteMany({
        where: { createdAt: { lt: thirtyDaysAgo } },
      });

      // Cleanup Read Notifications
      const deletedNotif = await prisma.notification.deleteMany({
        where: {
          isRead: true,
          createdAt: { lt: thirtyDaysAgo },
        },
      });

      logger.success(
        `Cleanup: Removed ${deletedActivity.count} logs and ${deletedNotif.count} notifications.`,
      );
    } catch (error) {
      logger.error("Daily cleanup failed:", error);
    }
  });

  /**
   * 2. HOURLY MAINTENANCE
   * Automatically deactivate expired subscriptions
   */
  cron.schedule("0 * * * *", async () => {
    try {
      const result = await prisma.subscription.updateMany({
        where: {
          isActive: true,
          endDate: { lt: new Date() },
        },
        data: { isActive: false },
      });

      if (result.count > 0) {
        logger.warn(
          `Subscription Sync: Deactivated ${result.count} expired plans.`,
        );
      }
    } catch (error) {
      logger.error("Hourly subscription sync failed:", error);
    }
  });
};
