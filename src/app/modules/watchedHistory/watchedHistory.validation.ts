import { z } from "zod";

const watchedHistoryBodySchema = z.object({
  watchedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .optional(),
  notes: z.string().max(500).optional(),
  isRewatch: z.boolean().optional(),
  lastPosition: z.number().min(0).optional(),
  duration: z.number().min(0).optional(),
  isCompleted: z.boolean().optional(),
});

const logMovieSchema = z.object({
  body: watchedHistoryBodySchema.extend({
    mediaId: z.uuid({ message: "Invalid Media ID format" }),
  }),
});

const updateLogSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "Invalid Log ID format" }),
  }),
  // We use .partial() to make sure everything is optional,
  // and we DON'T extend mediaId here to keep it immutable.
  body: watchedHistoryBodySchema.partial().strict(),
});

export const WatchedHistoryValidation = {
  logMovieSchema,
  updateLogSchema,
};
