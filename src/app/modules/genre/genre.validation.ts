import { z } from "zod";

const createGenreSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Genre name is required")
      .max(50, "Genre name is too long"),
  }),
});

const updateGenreSchema = createGenreSchema;

export const GenreValidation = {
  createGenreSchema,
  updateGenreSchema,
};
