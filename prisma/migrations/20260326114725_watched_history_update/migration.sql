-- AlterTable
ALTER TABLE "WatchedHistory" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastPosition" INTEGER NOT NULL DEFAULT 0;
