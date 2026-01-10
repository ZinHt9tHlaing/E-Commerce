import { Request } from "express";
import { Types } from "mongoose";

export interface UserTypes {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface CustomRequest extends Request {
  user?: any;
}
