import express from "express";
import MediaController from "../controllers/media.controller";
import { verifyToken } from "../middlewares/verifytoken";

const router = express.Router();

router.post("/upload-file", verifyToken, MediaController.uploadFile);
router.post("/upload-meta-data", verifyToken, MediaController.uploadMetaData);
router.get("/get-meta-data", MediaController.getVideoInfo);
router.get("/play", MediaController.getVideoStream);
router.get("/get-video-by-user", MediaController.getAllVideoByUser);
router.get("/get-video-liked-by-user", MediaController.getAllLikedVideoByUser);
router.get("/get-count", MediaController.getTotalDocuments);
router.delete("/delete-video", verifyToken, MediaController.deleteVideo);
export default router;
