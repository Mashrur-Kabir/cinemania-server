import { z } from "zod";

const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Comment cannot be empty"),
    reviewId: z.uuid(),
    parentId: z.uuid().optional(),
  }),
});

const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Comment cannot be empty"),
  }),
});

export const CommentValidation = {
  createCommentSchema,
  updateCommentSchema,
};
