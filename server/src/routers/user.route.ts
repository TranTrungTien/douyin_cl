import express from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifytoken";

const router = express.Router();

router.get("/", verifyToken, UserController.getOwnInfo);
router.get("/info", UserController.getUserInfo);
router.post("/save", UserController.createUser);
router.put("/update", UserController.updateUser);
router.delete("/delete", UserController.deleteUser);
router.post("/login", UserController.login);
router.post("/send-mail", UserController.mailSender);
router.post("/verify-email", UserController.verifyCode);
router.post("/login-without-password", UserController.loginWithoutPassword);

export default router;
