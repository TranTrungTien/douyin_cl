import express from "express";
import CommentController from "../controllers/comment.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.get("/", CommentController.getCommentOfVideo);
router.get("/reply", CommentController.getReplyComments);
router.post("/create-comment", verifyToken, CommentController.createComment);
router.delete("/delete-comment", CommentController.deleteComment);
export default router;
