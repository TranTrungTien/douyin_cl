import express from "express";
import shareController from "../controllers/share.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create-shared", verifyToken, shareController.createShared);
router.delete("/delete-shared", verifyToken, shareController.deleteShared);

export default router;
