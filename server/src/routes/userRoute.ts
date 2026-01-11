// src/routes/auth.ts
import express from "express";

import { getUserInfo, login, register } from "../controller/userController";

import {
  loginValidator,
  registerValidator,
} from "../validators/userValidators";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

router.get("/profile", protect, isAdmin, getUserInfo);

export default router;
