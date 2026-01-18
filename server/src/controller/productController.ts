import { NextFunction, Request, Response } from "express";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";
import { Product } from "../models/Product";
import asyncHandler from "../utils/asyncHandler";
import { errorCode } from "../config/errorCode";
import { createError } from "../utils/error";
import slugify from "slugify";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, quantity, category, shipping } = req.body;

    const photo = req.files as Express.Multer.File[];

    const updatedPhoto = await Promise.all(
      photo.map(async (img) => {
        // buffer -> base64
        const base64 = img.buffer.toString("base64");

        const uploadImg = await uploadSingleImage(
          `data:${img.mimetype};base64,${base64}`,
          "e-commerce/products"
        ); // Upload to cloudinary as base64 string

        return {
          url: uploadImg.image_url,
          public_alt: uploadImg.public_alt,
        };
      })
    );

    const newProducts = await Product.create({
      name,
      description,
      price,
      slug: slugify(name),
      category,
      quantity,
      photo: updatedPhoto,
      shipping,
    });

    if (!newProducts) {
      throw createError("Product not created", 400, errorCode.invalid);
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);

//get all products
export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: "All products fetched successfully",
      products,
    });
  }
);

// get single product
export const getSingleProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    if (!product) {
      throw createError("Product not found", 404, errorCode.NotFound);
    }
    res.status(200).json({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  }
);

// get photo
export const getProductPhoto = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id)
      .select("photo")
      .populate("category");
    if (!product) {
      throw createError("Product not found", 404, errorCode.NotFound);
    }

    console.log("product", product);
    res.status(200).json({
      success: true,
      message: "Product Photo Fetched",
      product: product.photo,
    });
  }
);

// delete product
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw createError("Product not found", 404, errorCode.NotFound);
    }

    const imagesToDeleteWithPublicAltOnly = existingProduct.photo.map(
      (img) => img.public_alt
    );

    try {
      await existingProduct.deleteOne();

      if (imagesToDeleteWithPublicAltOnly.length > 0) {
        await Promise.all(
          imagesToDeleteWithPublicAltOnly.map(async (imageAlt) => {
            try {
              await deleteImage(imageAlt);
            } catch (error) {
              console.log(`Failed to delete image: ${imageAlt}`, error);
            }
          })
        );
      }

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      throw createError("Fail to delete product", 500, errorCode.invalid);
    }
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, quantity, category, shipping } = req.body;
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw createError("Product not found", 404, errorCode.NotFound);
    }

    const photo = req.files as Express.Multer.File[];

    if (photo && photo.length > 0) {
      if (existingProduct.photo && existingProduct.photo.length > 0) {
        await Promise.all(
          existingProduct.photo.map(async (imageAlt) => {
            try {
              await deleteImage(imageAlt.public_alt);
            } catch (error) {
              console.log(
                `Failed to delete image: ${imageAlt.public_alt}`,
                error
              );
            }
          })
        );
      }

      // 2. Upload all new photos
      const updatedPhotos = await Promise.all(
        photo.map(async (img) => {
          const base64 = img.buffer.toString("base64");
          const uploadImg = await uploadSingleImage(
            `data:${img.mimetype};base64,${base64}`,
            "e-commerce/products"
          );

          return {
            url: uploadImg.image_url,
            public_alt: uploadImg.public_alt,
          };
        })
      );

      existingProduct.photo = photo ? updatedPhotos : existingProduct.photo;
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.price = price || existingProduct.price;
    existingProduct.quantity = quantity || existingProduct.quantity;
    existingProduct.category = category || existingProduct.category;
    existingProduct.shipping = shipping || existingProduct.shipping;
    existingProduct.slug = name ? slugify(name) : existingProduct.slug;

    const updatedProduct = await existingProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  }
);
