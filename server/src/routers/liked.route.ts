import express from "express";
import likedController from "../controllers/liked.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", verifyToken, likedController.createLiked);
router.delete("/delete", verifyToken, likedController.deleteLiked);

export default router;
