import express from "express";
import { verifyToken } from "../middlewares/verifytoken";
import followerController from "../controllers/follower.controller";
const router = express.Router();

router.post("/create-follower", verifyToken, followerController.createFollower);
router.patch("/block-follower", verifyToken, followerController.blockFollower);

export default router;
