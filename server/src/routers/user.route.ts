import express from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifytoken";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken";

const router = express.Router();

router.get("/", verifyToken, UserController.getOwnInfo);
router.get("/info", UserController.getUserInfo);
router.post("/save", UserController.createUser);
router.put("/update", verifyToken, UserController.updateUser);
router.delete("/delete", verifyToken, UserController.deleteUser);
router.post("/login", UserController.login);
router.post("/send-mail", UserController.mailSender);
router.post("/verify-email", UserController.verifyCode);
router.post("/login-without-password", UserController.loginWithoutPassword);
router.get("/refreshToken", verifyRefreshToken, UserController.refreshToken);
router.delete("/delete-token", UserController.logout);

export default router;
