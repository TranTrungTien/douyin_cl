import express from "express";
import statisticsController from "../controllers/statistics.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", statisticsController.create);
router.patch(
  "/update/like-count",
  verifyToken,
  statisticsController.updateLikeCount
);
router.patch(
  "/update/comment-count",
  verifyToken,
  statisticsController.updateCommentCount
);
router.patch(
  "/update/share-count",
  verifyToken,
  statisticsController.updateShareCount
);
router.get("/", statisticsController.get);

export default router;
