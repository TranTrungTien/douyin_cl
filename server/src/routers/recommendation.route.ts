import express from "express";
import RecommendationController from "../controllers/recommendation.controller";

const router = express.Router();

router.get("/new", RecommendationController.getRecommendationDef);

export default router;
