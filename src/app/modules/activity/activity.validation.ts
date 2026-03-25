import { z } from "zod";

const getFeedSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 20)),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 1)),
  }),
});

export const ActivityValidation = {
  getFeedSchema,
};
