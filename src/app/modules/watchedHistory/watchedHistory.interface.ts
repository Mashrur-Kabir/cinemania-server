export interface IWatchedHistoryPayload {
  mediaId: string;
  watchedAt?: string | Date; // Optional: users can log past watches
  notes?: string; // Optional: short thoughts
  isRewatch?: boolean; // Optional: defaults to false in logic
}
