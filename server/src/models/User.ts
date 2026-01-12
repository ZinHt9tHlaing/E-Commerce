import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  answer: string;
  role: "user" | "admin";
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
