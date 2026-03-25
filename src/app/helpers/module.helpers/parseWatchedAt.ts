import dayjs from "dayjs";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const parseWatchedAt = (input?: string): Date => {
  if (!input) return new Date();

  const parsed = dayjs.utc(input); // 🔥 KEY

  if (!parsed.isValid()) {
    throw new AppError(status.BAD_REQUEST, "Invalid date format");
  }

  return parsed.startOf("day").toDate();
};
