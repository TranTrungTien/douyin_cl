import express from "express";
import FollowingController from "../controllers/following.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post(
  "/create-following",
  verifyToken,
  FollowingController.createFollowing
);
router.get("/check-following", verifyToken, FollowingController.checkFollowing);
router.get("/", verifyToken, FollowingController.getAllFollowing);
router.patch("blocked-user-by-author", verifyToken, FollowingController.block);
router.delete(
  "/delete-following",
  verifyToken,
  FollowingController.deleteFollowing
);

export default router;
