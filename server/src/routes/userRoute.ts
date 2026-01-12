// src/routes/auth.ts
import express from "express";

import {
  forgotPassword,
  getUserInfo,
  login,
  logout,
  register,
  sendForgotPasswordEmail,
} from "../controller/userController";

import {
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
} from "../validators/userValidators";
import { protect } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);

router.post("/send-forgot-password", sendForgotPasswordEmail);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validateRequest,
  forgotPassword
);

router.get("/get-user-info", protect, getUserInfo);

export default router;
