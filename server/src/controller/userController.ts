import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/generate";
import { CustomRequest } from "../types/customRequest";
import { createError } from "../utils/error";
import { errorCode } from "../config/errorCode";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phone, address } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(
      createError(
        "User already exists with this email address!",
        400,
        errorCode.userExist
      )
    );
  }

  const newUser = await User.create({ name, email, password, phone, address });
  const safeUser = await User.findById(newUser._id).select("-password");

  res.status(201).json({
    success: true,
    message: "User created successfully",
    safeUser,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return next(
      createError(
        "User not found with this credentials!",
        401,
        errorCode.NotFound
      )
    );
  }

  const comparedPassword = await existingUser?.comparePassword(password);

  if (!existingUser || !comparedPassword) {
    return next(createError("Invalid credentials!", 401, errorCode.NotFound));
  }

  generateToken(res, existingUser._id, existingUser.email);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    userId: existingUser._id,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("jwt", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
};

export const getUserInfo = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (!user) {
    return next(createError("User not found", 404, errorCode.NotFound));
  }

  const userDoc = await User.findById(user?._id).select("-password");

  res.status(200).json(userDoc);
};

export const sendForgotPasswordEmail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return next(createError("Wrong Email or Answer", 404, errorCode.NotFound));
  }

  res.status(200).json({ message: "Email sent successfully" });
};

export const forgotPassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, newPassword } = req.body;

  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return next(createError("User not found", 404, errorCode.NotFound));
  }

  userDoc.password = newPassword;
  await userDoc.save();
  res.status(200).json({ message: "Password changed successfully" });
};
