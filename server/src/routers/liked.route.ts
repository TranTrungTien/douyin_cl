import express from "express";
import likedController from "../controllers/liked.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create-liked", verifyToken, likedController.createLiked);
router.get("/check-liked", verifyToken, likedController.checkLiked);
router.delete("/delete-liked", verifyToken, likedController.deleteLiked);

export default router;
