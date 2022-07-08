import express from "express";
import own_videoController from "../controllers/own_video.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", verifyToken, own_videoController.createYourVideo);
router.patch("/delete", verifyToken, own_videoController.deleteYourVideo);

export default router;
