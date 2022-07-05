import express from "express";
import MediaController from "../controllers/media.controller";
import { verifyToken } from "../middlewares/verifytoken";

const router = express.Router();

router.post("/upload-file", verifyToken, MediaController.uploadFile);
router.post("/upload-meta-data", verifyToken, MediaController.uploadMetaData);
router.get("/get-video-info", MediaController.getVideoInfo);
router.get("/get-stream-video", MediaController.getVideoStream);
router.get("/get-video-cover", MediaController.getVideoCover);
export default router;
