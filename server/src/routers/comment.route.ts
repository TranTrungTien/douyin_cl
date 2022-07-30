import express from "express";
import commentController from "../controllers/comment.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.get("/", commentController.getCommentOfVideo);
router.post("/create-comment", verifyToken, commentController.createComment);
router.delete("/delete-comment", commentController.deleteComment);
export default router;
