// src/routes/auth.ts
import express from "express";

import {
  getUserInfo,
  login,
  logout,
  register,
} from "../controller/userController";

import {
  loginValidator,
  registerValidator,
} from "../validators/userValidators";
import { protect } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", logout);

router.get("/get-user-info", protect, getUserInfo);

export default router;
