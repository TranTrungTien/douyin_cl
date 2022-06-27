import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getUser);
router.post("/save", UserController.createUser);
router.put("/update", UserController.updateUser);
router.delete("/delete", UserController.deleteUser);
router.post("/login", UserController.login);
router.post("/send-mail", UserController.mailSender);
router.post("/verify-email", UserController.verifyCode);
router.post("/login-without-password", UserController.loginWithoutPassword);

export default router;
