import express from "express";
import MediaController from "../controllers/media.controller";
import { verifyToken } from "../middlewares/verifytoken";

const router = express.Router();

router.post("/upload-file", verifyToken, MediaController.uploadFile);
router.post("/upload-meta-data", verifyToken, MediaController.uploadMetaData);
router.get("/get-meta-data", verifyToken, MediaController.getVideoInfo);
router.get("/play", MediaController.getVideoStream);
export default router;
