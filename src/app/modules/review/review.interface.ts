import { ReviewStatus } from "../../../generated/prisma/enums";
import { IQueryParams } from "../../interfaces/query.interface";

export interface IReviewPayload {
  rating: number;
  content: string;
  mediaId: string;
  isSpoiler?: boolean;
  tags?: string[];
}

export interface IReviewFilterOptions extends IQueryParams {
  status?: ReviewStatus;
  mediaId?: string;
  userId?: string;
  isSpoiler?: string;
}
