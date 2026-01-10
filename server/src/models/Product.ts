import mongoose from "mongoose";

interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // Cloudinary URL
  countInStock: number;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
