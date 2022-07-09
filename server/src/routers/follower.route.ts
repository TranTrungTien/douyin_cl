import express from "express";
import { verifyToken } from "../middlewares/verifytoken";
import followerController from "../controllers/follower.controller";
const router = express.Router();

router.post("/create", verifyToken, followerController.createFollower);
router.patch("/block", verifyToken, followerController.blockFollower);

export default router;
