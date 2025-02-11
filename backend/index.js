const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Routes
const plantRoutes = require('./src/plants/plant.route'); 
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use("/api/plants", plantRoutes); 
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send("Welcome to my plant server!"); 
    });
}
main().then(() => console.log("Mongodb connected successfully.")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
