import { z } from "zod";
import { ReviewStatus } from "../../../generated/prisma/enums";

const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    content: z.string().min(10, "Review must be at least 10 characters"),
    mediaId: z.uuid(),
    isSpoiler: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const updateReviewSchema = z.object({
  body: createReviewSchema.shape.body.partial(),
});

const changeStatusSchema = z.object({
  body: z.object({
    status: z.enum(ReviewStatus),
  }),
});

const reportReviewSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .min(5, "Please provide a valid reason for reporting (min 5 chars)"),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
  updateReviewSchema,
  changeStatusSchema,
  reportReviewSchema,
};
