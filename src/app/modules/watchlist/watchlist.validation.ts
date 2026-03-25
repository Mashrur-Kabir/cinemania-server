import { z } from "zod";

const toggleWatchlistSchema = z.object({
  // We are validating the URL segment, not the JSON body
  params: z.object({
    mediaId: z.uuid({ message: "Invalid Media ID format in URL" }),
  }),
});

export const WatchlistValidation = {
  toggleWatchlistSchema,
};
