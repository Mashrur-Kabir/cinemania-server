import { z } from "zod";
import { Pricing } from "../../../generated/prisma/enums";

const createMediaSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    releaseYear: z
      .number()
      .int()
      .min(1800)
      .max(new Date().getFullYear() + 5),
    director: z.string().min(1, "Director is required"),
    cast: z.array(z.string()).min(1, "At least one cast member is required"),
    platform: z.string().min(1, "Platform is required"),
    pricing: z.enum(Pricing),
    streamingUrl: z.url().optional().nullable(),
    genreIds: z.array(z.string()).min(1, "At least one genre is required"),
  }),
});

const updateMediaSchema = createMediaSchema.partial();

export const MediaValidation = {
  createMediaSchema,
  updateMediaSchema,
};
