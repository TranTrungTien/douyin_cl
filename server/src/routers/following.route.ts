import express from "express";
import followingController from "../controllers/following.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post(
  "/create-following",
  verifyToken,
  followingController.createFollowing
);
router.delete(
  "/delete-following",
  verifyToken,
  followingController.deleteFollowing
);

export default router;
