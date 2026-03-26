export type BadgeCriteriaType =
  | "WATCH_COUNT"
  | "GENRE_COUNT"
  | "FOLLOWER_COUNT"
  | "FOLLOWING_COUNT"
  | "COMMENT_COUNT"
  | "REVIEW_COUNT"
  | "REVIEW_LIKE_COUNT"
  | "NIGHT_OWL"
  | "WEEKEND_WARRIOR"
  | "ACCOUNT_AGE"
  | "SUBSCRIPTION_TIER"
  | "MARATHONER"
  | "COMPLETIONIST"
  | "REWATCH_KING";

export interface IBadgeCriteria {
  type: BadgeCriteriaType;
  value: number;
  genreName?: string;
  tier?: string;
}
