import { IQueryParams } from "../../interfaces/query.interface";

export interface IWatchlistFilterOptions extends IQueryParams {
  userId?: string;
  mediaId?: string;
}
