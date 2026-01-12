import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, "Invalid phone number")
    .min(5, "Invalid phone number")
    .max(12, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  answer: z.string().min(1, "Answer is required"),
});

export const loginSchema = z.object({
  email: z.email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter a valid email!" }),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
