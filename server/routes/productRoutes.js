import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);

// Admin only
router.post("/", verifyToken, verifyAdmin, addProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;