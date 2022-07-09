import express from "express";
import musicController from "../controllers/music.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", verifyToken, musicController.createMusic);

export default router;
