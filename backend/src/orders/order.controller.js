const Order = require("./order.model");

// Create an order
const createAOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};

// Get orders by email
const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({ email }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this email" });
        }
        
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching order", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching all orders", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

module.exports = {
    createAOrder,
    getOrderByEmail,
    getAllOrders,  
};
