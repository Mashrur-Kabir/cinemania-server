import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { GenreRoutes } from "../modules/genre/genre.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
import { WatchlistRoutes } from "../modules/watchlist/watchlist.routes";
import { FollowRoutes } from "../modules/follow/follow.routes";
import { WatchedHistoryRoutes } from "../modules/watchedHistory/watchedHistory.routes";
import { ActivityRoutes } from "../modules/activity/activity.routes";

const router = Router();

//auth entry:
router.use("/auth", AuthRoutes);

//media
router.use("/media", MediaRoutes);

//genre
router.use("/genre", GenreRoutes);

//review
router.use("/review", ReviewRoutes);

//comment
router.use("/comment", CommentRoutes);

//watchlist
router.use("/watchlist", WatchlistRoutes);

//follow
router.use("/follow", FollowRoutes);

//watchedHistory
router.use("/watchedHistory", WatchedHistoryRoutes);

//activity
router.use("/activity", ActivityRoutes);

//notification
// router.use("/notification");

export const IndexRoutes = router;
