const express = require('express');
const { createAOrder, getOrderByEmail , getAllOrders , updateOrderStatus} = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

//get all orders
router.get("/", getAllOrders);

// Update order status
router.put("/:id", updateOrderStatus);

module.exports = router;