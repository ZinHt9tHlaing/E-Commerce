import { body, param } from "express-validator";

export const createCategoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
];

export const updateCategoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  param("id").isMongoId().withMessage("Invalid category id"),
];

export const singleCategoryValidator = [
  param("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .isString()
    .withMessage("Slug must be a string"),
];
