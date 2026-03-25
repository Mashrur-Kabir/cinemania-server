import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { GenreRoutes } from "../modules/genre/genre.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
import { WatchlistRoutes } from "../modules/watchlist/watchlist.routes";

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

export const IndexRoutes = router;
