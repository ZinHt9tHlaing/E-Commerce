import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (
  res: Response,
  userId: Types.ObjectId | string,
  email: string
) => {
  const token = jwt.sign(
    { _id: userId, email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
