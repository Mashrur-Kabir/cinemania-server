import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = Router();

//auth entry:
router.use("/auth", AuthRoutes);

export const IndexRoutes = router;
