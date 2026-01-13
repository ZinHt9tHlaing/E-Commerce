import mongoose from "mongoose";

interface Photo {
  url: string;
  public_alt: string;
}

interface IProduct extends mongoose.Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  quantity: number;
  // photo: {
  //   data: Buffer;
  //   contentType: string;
  // };
  photo: Photo[];
  shipping: boolean;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      type: [
        {
          url: String,
          public_alt: String,
        },
      ],
      required: true,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
