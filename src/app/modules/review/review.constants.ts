import { Prisma } from "../../../generated/prisma/client";

/**
 * Fields allowed for partial text searching.
 * Searching 'user.name' allows admins to find all reviews by a specific person.
 */
export const reviewSearchableFields = [
  "content",
  "tags",
  "user.name",
  "media.title",
];

/**
 * Fields allowed for exact matching/range filtering.
 * Crucial for the Admin Dashboard to filter by PENDING status.
 */
export const reviewFilterableFields = [
  "rating",
  "isSpoiler",
  "status",
  "mediaId",
  "userId",
  "isDeleted",
];

/**
 * Standard data inclusion for reviews.
 * We include the User (for the avatar/name) and the Media (to see what is being reviewed).
 */
export const reviewIncludeConfig: Partial<
  Record<
    keyof Prisma.ReviewInclude,
    Prisma.ReviewInclude[keyof Prisma.ReviewInclude]
  >
> = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  },
  media: {
    select: {
      id: true,
      title: true,
      slug: true,
      averageRating: true,
    },
  },
  comments: {
    where: { isDeleted: false },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
      replies: true, // Support for nested conversation previews
    },
    take: 5, // Just a preview of the discussion
  },
  likes: true,
};
