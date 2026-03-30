import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Logged in user
router.post("/", verifyToken, placeOrder);
router.get("/my-orders", verifyToken, getUserOrders);

// Admin only
router.get("/", verifyToken, verifyAdmin, getAllOrders);
router.put("/:id", verifyToken, verifyAdmin, updateOrderStatus);

export default router;