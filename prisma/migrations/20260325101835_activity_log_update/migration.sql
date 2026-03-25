/*
  Warnings:

  - Changed the type of `action` on the `ActivityLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('FOLLOW', 'UNFOLLOW', 'WATCHLIST_ADD', 'WATCHLIST_REMOVE', 'REVIEW_CREATE', 'DIARY_LOG', 'LIKE_REVIEW');

-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "metadata" JSONB,
DROP COLUMN "action",
ADD COLUMN     "action" "ActivityAction" NOT NULL;
