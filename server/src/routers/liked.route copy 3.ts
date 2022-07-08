import express from "express";
import video_musicController from "../controllers/video_music.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", verifyToken, video_musicController.createVideoMusic);
router.delete("/delete", verifyToken, video_musicController.deleteVideoMusic);

export default router;
