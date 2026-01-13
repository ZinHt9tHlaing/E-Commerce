import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createProductValidator = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("photo").optional().isArray().withMessage("Photo must be an array"),
  body("photo.*.url")
    .optional()
    .isString()
    .withMessage("Each photo must have a URL"),
  body("photo.*.public_alt")
    .optional()
    .isString()
    .withMessage("Each photo must have a public_alt"),

  body("shipping")
    .optional()
    .isBoolean()
    .withMessage("Shipping must be true or false"),
];

export const updateProductValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .optional()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid category id"),

  body("quantity")
    .optional()
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("photo").optional().isArray().withMessage("Photo must be an array"),
  body("photo.*.url")
    .optional()
    .isString()
    .withMessage("Each photo must have a URL"),
  body("photo.*.public_alt")
    .optional()
    .isString()
    .withMessage("Each photo must have a public_alt"),

  body("shipping")
    .optional()
    .isBoolean()
    .withMessage("Shipping must be true or false"),
];

export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),
];
