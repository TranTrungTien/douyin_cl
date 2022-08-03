import express from "express";
import LikedCommentController from "../controllers/liked_comment.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post(
  "/create-liked-comment",
  verifyToken,
  LikedCommentController.createLikedComment
);
router.get("/", verifyToken, LikedCommentController.getAllLikedCommentOfVideo);
router.get(
  "/in-other-comment",
  verifyToken,
  LikedCommentController.getAllLikedCommentInOtherComment
);
router.delete(
  "/delete-liked-comment",
  verifyToken,
  LikedCommentController.deleteLikedComment
);

export default router;
