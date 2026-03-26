import { Media, WatchedHistory } from "../../../generated/prisma/client";

export interface IDiscoveryResponse {
  trending: Media[];
  recommendations: Media[];
  continueWatching: (WatchedHistory & { media: Media })[];
  socialWatchParty: (WatchedHistory & {
    media: Media;
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  })[];
}
