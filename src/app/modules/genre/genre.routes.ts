import { Router } from "express";
import { GenreController } from "./genre.controller";
import { GenreValidation } from "./genre.validation";
import validateRequest from "../../middlewares/validateRequest";
import checkAuth from "../../middlewares/authMiddleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// Public: Users can view genres to filter movies
router.get("/", GenreController.getAllGenres);

// Admin Only: Manage the genre pool
router.post(
  "/",
  checkAuth(Role.ADMIN),
  validateRequest(GenreValidation.createGenreSchema),
  GenreController.createGenre,
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(GenreValidation.updateGenreSchema),
  GenreController.updateGenre,
);

router.delete("/:id", checkAuth(Role.ADMIN), GenreController.deleteGenre);

export const GenreRoutes = router;
