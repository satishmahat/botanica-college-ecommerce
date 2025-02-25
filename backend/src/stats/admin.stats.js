import mongoose from 'mongoose';
import express from 'express';
import Order from '../orders/order.model.js';
import Plant from '../plants/plant.model.js'; // Updated from Book to Plant

const router = express.Router();

// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 3. Trending plants statistics:
        const trendingPlantsCount = await Plant.aggregate([
            { $match: { trending: true } }, // Match only trending plants
            { $count: "trendingPlantsCount" } // Return the count of trending plants
        ]);

        // Extract count as a number
        const trendingPlants = trendingPlantsCount.length > 0 ? trendingPlantsCount[0].trendingPlantsCount : 0;

        // 4. Total number of plants
        const totalPlants = await Plant.countDocuments();

        // 5. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
                    totalSales: { $sum: "$totalPrice" }, // Sum totalPrice for each month
                    totalOrders: { $sum: 1 } // Count total orders for each month
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        // Result summary
        res.status(200).json({
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingPlants,
            totalPlants,
            monthlySales,
        });

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
});

export default router;
