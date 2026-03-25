import { IQueryParams } from "../../interfaces/query.interface";

export interface IFollowFilterOptions extends IQueryParams {
  followerId?: string;
  followingId?: string;
}
