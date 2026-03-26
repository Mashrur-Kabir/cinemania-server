import cron from "node-cron";
import { logger } from "./logger";
import { ActivityService } from "../modules/activity/activity.service";
import { NotificationService } from "../modules/notification/notification.service";
import { PaymentService } from "../modules/payment/payment.service";

export const initCronTasks = () => {
  /**
   * 1. DAILY MAINTENANCE (Midnight)
   */
  cron.schedule("0 0 * * *", async () => {
    logger.warn("Running daily database maintenance...");

    try {
      const logResult = await ActivityService.cleanupOldLogs();
      const notifResult =
        await NotificationService.cleanupOldReadNotifications();

      logger.success(
        `Daily Cleanup: Removed ${logResult.count} logs and ${notifResult.count} notifications.`,
      );
    } catch (error) {
      logger.error("Daily cleanup failed:", error);
    }
  });

  /**
   * 2. HOURLY MAINTENANCE
   */
  cron.schedule("0 * * * *", async () => {
    try {
      const result = await PaymentService.syncExpiredSubscriptions();

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
