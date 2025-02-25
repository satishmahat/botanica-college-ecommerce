import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'; // Loads environment variables

import plantRoutes from './src/plants/plant.route.js';
import orderRoutes from './src/orders/order.route.js';
import userRoutes from './src/users/user.route.js';
import adminRoutes from './src/stats/admin.stats.js';
import paymentRoutes from './src/payment/payment.route.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Routes
app.use("/api/plants", plantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/payment', paymentRoutes);

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Mongodb connected successfully.");
        
        app.get('/', (req, res) => {
            res.send("Welcome to my plant server!");
        });

        app.listen(port, () => {
          console.log(`Example app listening on port ${port}`);
        });

    } catch (err) {
        console.error("Database connection error:", err);
    }
}

main();
