-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'COMMENT_ADD';
ALTER TYPE "NotificationType" ADD VALUE 'NEW_MEDIA';
ALTER TYPE "NotificationType" ADD VALUE 'REPORT_ALERT';
