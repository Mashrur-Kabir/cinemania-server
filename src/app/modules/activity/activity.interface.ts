import { IQueryParams } from "../../interfaces/query.interface";

export interface IActivityFilterOptions extends IQueryParams {
  limit?: string;
  page?: string;
}
