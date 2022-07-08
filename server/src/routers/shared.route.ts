import express from "express";
import shareController from "../controllers/share.controller";
import { verifyToken } from "../middlewares/verifytoken";
const router = express.Router();

router.post("/create", verifyToken, shareController.createShared);
router.delete("/delete", verifyToken, shareController.deleteShared);

export default router;
