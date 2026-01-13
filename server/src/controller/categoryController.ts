import { Request, Response } from "express";
import { Category } from "../models/Category";
import { createError } from "../utils/error";
import { errorCode } from "../config/errorCode";
import slugify from "slugify";
import asyncHandler from "../utils/asyncHandler";

// create category
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw createError("Category already exists", 400, errorCode.invalid);
    }

    const newCategory = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
    });
    res.status(201).json({
      success: true,
      message: "New Category created successfully",
      newCategory,
    });
  }
);

// update category
export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findById(id);
    console.log(category);

    if (!category) {
      throw createError("Category not found", 404, errorCode.NotFound);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  }
);

// get all cat
export const getAllCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const [categories, totalCategory] = await Promise.all([
      Category.find({}).sort({ createdAt: -1 }),
      Category.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "All Categories List",
      totalCategory,
      categories,
    });
  }
);

// single category
export const getSingleCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await Category.findOne({
      slug: req.params.slug,
    });

    if (!category) {
      throw createError("Category not found", 404, errorCode.NotFound);
    }

    res.status(200).json({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  }
);

//delete category
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  }
);
