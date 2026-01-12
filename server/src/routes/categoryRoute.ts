import express from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controller/categoryController";
import {
  createCategoryValidator,
  singleCategoryValidator,
  updateCategoryValidator,
} from "../validators/categoryValidators";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-category",
  protect,
  isAdmin,
  createCategoryValidator,
  validateRequest,
  createCategory
);

router.get("/get-all-categories", protect, isAdmin, getAllCategory);

router.get(
  "/get-single-category/:slug",
  protect,
  isAdmin,
  singleCategoryValidator,
  validateRequest,
  getSingleCategory
);

router.patch(
  "/update-category/:id",
  protect,
  isAdmin,
  updateCategoryValidator,
  validateRequest,
  updateCategory
);

router.delete("/delete-category/:id", protect, isAdmin, deleteCategory);

export default router;
