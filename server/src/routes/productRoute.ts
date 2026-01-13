import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  updateProduct,
} from "../controller/productController";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../validators/productValidator";
import { validateRequest } from "../middlewares/validateRequest";
import { upload } from "../utils/upload";

const router = express.Router();

router.post(
  "/create-product",
  protect,
  isAdmin,
  upload.array("photo"),
  createProductValidator,
  validateRequest,
  createProduct
);

router.get("/get-all-products", protect, isAdmin, getAllProducts);
router.get("/get-single-product/:slug", protect, isAdmin, getSingleProduct);
router.get("/get-product-photo/:id", protect, isAdmin, getProductPhoto);

router.patch(
  "/update-product/:id",
  protect,
  isAdmin,
  upload.array("photo"),
  updateProductValidator,
  validateRequest,
  updateProduct
);

router.delete(
  "/delete-product/:id",
  protect,
  isAdmin,
  deleteProductValidator,
  validateRequest,
  deleteProduct
);

export default router;
