// src/routes/product.ts
import express from "express";
import { getProducts } from "../controller/productController";
import { isAdmin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, isAdmin, getProducts);
// router.post('/', protect, admin, uploadImage, createProduct);


export default router;
