// src/routes/product.ts
import express from "express";
import { createProduct } from "../controller/productController";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import { upload } from "../utils/upload";

const router = express.Router();

router.post("/create-product", isAdmin, upload.single("image"), createProduct);
// router.post('/', protect, admin, uploadImage, createProduct);

export default router;
