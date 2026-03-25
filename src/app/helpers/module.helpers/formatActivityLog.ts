import { ActivityAction } from "../../../generated/prisma/enums";
import { Prisma } from "../../../generated/prisma/client";

// 1. Define the shape of the Metadata
interface IActivityMetadata {
  name?: string;
  title?: string;
  mediaTitle?: string;
  rating?: number;
  authorName?: string;
}

// 2. Define the shape of the Log including the User relation
type ActivityLogWithUser = Prisma.ActivityLogGetPayload<{
  include: { user: { select: { name: true; image: true } } };
}>;

/**
 * 3. The Lookup Object (Record)
 * This maps each action to a function that generates the summary string.
 */
const ACTION_MAP: Record<
  ActivityAction,
  (actor: string, meta: IActivityMetadata) => string
> = {
  [ActivityAction.FOLLOW]: (actor, meta) =>
    `${actor} followed ${meta?.name || "a user"}`,
  [ActivityAction.UNFOLLOW]: (actor, meta) =>
    `${actor} unfollowed ${meta?.name || "a user"}`,
  [ActivityAction.WATCHLIST_ADD]: (actor, meta) =>
    `${actor} added ${meta?.title || "a movie"} to their watchlist`,
  [ActivityAction.WATCHLIST_REMOVE]: (actor, meta) =>
    `${actor} removed ${meta?.title || "a movie"} from their watchlist`,
  [ActivityAction.DIARY_LOG]: (actor, meta) =>
    `${actor} watched and logged ${meta?.title || "a movie"}`,
  [ActivityAction.REVIEW_CREATE]: (actor, meta) =>
    `${actor} reviewed ${meta?.mediaTitle || "a movie"} (${meta?.rating} stars)`,
  [ActivityAction.LIKE_REVIEW]: (actor, meta) =>
    `${actor} liked ${meta?.authorName ? `${meta.authorName}'s` : "a"} review`,
};

export const formatActivityLog = (log: ActivityLogWithUser) => {
  const actor = log.user?.name || "Someone";
  const meta = (log.metadata as IActivityMetadata) || {};

  // Find the correct handler, or fallback to a default message
  const generateSummary = ACTION_MAP[log.action];

  const summary = generateSummary
    ? generateSummary(actor, meta)
    : `${actor} performed an action`;

  return {
    ...log,
    summary,
  };
};
