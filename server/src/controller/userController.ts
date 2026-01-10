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
  const { name, email, password } = req.body;

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

  const newUser = await User.create({ name, email, password });
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
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

  generateToken(res, existingUser._id);

  res.status(201).json({
    _id: existingUser._id,
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
