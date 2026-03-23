import { Pricing } from "../../../generated/prisma/enums";
import { IQueryParams } from "../../interfaces";

export interface IMediaPayload {
  title: string;
  description: string;
  releaseYear: number;
  director: string;
  cast: string[];
  platform: string;
  pricing: Pricing;
  streamingUrl?: string;
  genreIds: string[]; // Array of IDs to connect
}

export interface IMediaFilterOptions extends IQueryParams {
  searchTerm?: string;
  genre?: string;
  platform?: string;
  releaseYear?: string;
  minRating?: string;
  pricing?: Pricing;
}
