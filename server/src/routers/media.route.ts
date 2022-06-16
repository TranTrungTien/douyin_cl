import express from "express";
import MediaController from "../controllers/media.controller";

const router = express.Router();

router.post("/upload", MediaController.upload);
router.get("/get-video", MediaController.get_video);
export default router;
