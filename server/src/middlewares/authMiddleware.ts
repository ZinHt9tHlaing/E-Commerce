import { NextFunction, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { CustomRequest, UserTypes } from "../types/customRequest";
import { Types } from "mongoose";
import { createError } from "../utils/error";
import { errorCode } from "../config/errorCode";

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies ? req.cookies.token : null;

  if (!token) {
    return next(
      createError(
        "You are not a authenticated user.",
        401,
        errorCode.unauthenticated
      )
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string | Types.ObjectId;
      email: string;
    };

    const user = (await User.findById(decoded._id).select(
      "-password"
    )) as UserTypes;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.email !== decoded.email) {
      return next(
        createError(
          "You are not a authenticated user.",
          401,
          errorCode.unauthenticated
        )
      );
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(401).json({ message: "Not authorized" });
  }
  next();
};
