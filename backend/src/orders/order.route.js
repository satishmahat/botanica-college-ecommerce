import express from 'express';
import { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } from './order.controller.js';

const router = express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

// get all orders
router.get("/", getAllOrders);

// Update order status
router.put("/:id", updateOrderStatus);

export default router;
