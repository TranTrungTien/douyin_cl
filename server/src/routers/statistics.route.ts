import express from "express";
import StatisticsController from "../controllers/statistics.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", StatisticsController.create);
router.patch(
  "/update/like-count",
  verifyToken,
  StatisticsController.updateLikeCount
);
router.patch(
  "/update/comment-count",
  verifyToken,
  StatisticsController.updateCommentCount
);
router.patch(
  "/update/share-count",
  verifyToken,
  StatisticsController.updateShareCount
);
router.get("/video", StatisticsController.getStatisticsOfVideo);

export default router;
