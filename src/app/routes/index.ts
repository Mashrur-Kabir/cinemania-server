import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { GenreRoutes } from "../modules/genre/genre.routes";
import { ReviewRoutes } from "../modules/review/review.routes";

const router = Router();

//auth entry:
router.use("/auth", AuthRoutes);

//media
router.use("/media", MediaRoutes);

//genre
router.use("/genre", GenreRoutes);

//review
router.use("/review", ReviewRoutes);

export const IndexRoutes = router;
