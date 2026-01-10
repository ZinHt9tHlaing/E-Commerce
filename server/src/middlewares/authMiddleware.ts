import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Types } from "mongoose";
import { CustomRequest, UserTypes } from "../types/customRequest";

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = (await User.findById(decoded.id).select(
      "-password"
    )) as UserTypes;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error", error);
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
