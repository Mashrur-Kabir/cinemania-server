/*
  Warnings:

  - The values [NEW_MEDIA] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('FOLLOW', 'LIKE_REVIEW', 'COMMENT_ADD', 'COMMENT_REPLY', 'REVIEW_APPROVED', 'REVIEW_REJECTED', 'WATCHED_MEDIA', 'REPORT_ALERT', 'SYSTEM_ANNOUNCEMENT');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;
