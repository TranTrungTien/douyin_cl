import express from "express";
import MediaController from "../controllers/media.controller";

const router = express.Router();

router.post("/upload", MediaController.upload);
router.get("/get-video-stream", MediaController.getVideoStream);
router.get("/get-video-info", MediaController.getVideoInfo);
export default router;
