import { NotificationType, Prisma } from "../../../generated/prisma/client";

/**
 * 1. Define the shape of the Notification including the Actor relation
 */
type NotificationWithActor = Prisma.NotificationGetPayload<{
  include: { actor: { select: { name: true; image: true } } };
}>;

/**
 * 2. The Lookup Object (Record)
 * Maps NotificationType to a sentence generator.
 */
// src/app/helpers/module.helpers/formatNotification.ts

const NOTIFICATION_MAP: Record<
  NotificationType,
  (actor: string, msg: string) => string
> = {
  [NotificationType.FOLLOW]: (actor) => `${actor} started following you.`,
  [NotificationType.LIKE_REVIEW]: (actor) => `${actor} liked your review.`,
  [NotificationType.REVIEW_APPROVED]: (_, msg) =>
    `Your review for "${msg}" was approved!`,
  [NotificationType.REVIEW_REJECTED]: (_, msg) =>
    `Your review for "${msg}" was rejected by moderators.`,
  [NotificationType.REPORT_ALERT]: (actor, msg) =>
    `Report Alert: ${actor} flagged a review for: ${msg}`,
  [NotificationType.COMMENT_ADD]: (actor, msg) =>
    `${actor} commented on your review for "${msg}"`,
  [NotificationType.COMMENT_REPLY]: (actor) =>
    `${actor} replied to your comment`,
  [NotificationType.SYSTEM_ANNOUNCEMENT]: (_, msg) => msg,
  [NotificationType.WATCHED_MEDIA]: (actor, msg) =>
    `${actor} just watched "${msg}".`,
};

export const formatNotification = (notification: NotificationWithActor) => {
  const actorName = notification.actor?.name || "Someone";

  const generateSummary = NOTIFICATION_MAP[notification.type];

  const displayMessage = generateSummary
    ? generateSummary(actorName, notification.message)
    : notification.message;

  return {
    ...notification,
    displayMessage, // This is what the user sees in their inbox
  };
};
