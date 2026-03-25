import { z } from "zod";

const toggleFollowSchema = z.object({
  params: z.object({
    userId: z.string("Invalid User ID format"),
  }),
});

export const FollowValidation = {
  toggleFollowSchema,
};
