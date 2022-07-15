import express from "express";
import MediaController from "../controllers/media.controller";
const router = express.Router();

router.get("/cover", MediaController.getVideoCover);
router.get("/avatar-thumb", MediaController.getAvatarThumbnail);

export default router;
