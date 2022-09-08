import express from "express";
import RecommendationController from "../controllers/recommendation.controller";
import { verifyToken } from "../middlewares/verifytoken";

const router = express.Router();

router.get("/new", RecommendationController.getRecommendationDef);
router.get("/related", RecommendationController.getRecommendationFromVideo);
router.get("/search", RecommendationController.getSearchRecommended);
router.get("/training", verifyToken, RecommendationController.training);
router.get("/list", verifyToken, RecommendationController.list);
export default router;
