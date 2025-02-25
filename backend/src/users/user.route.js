import express from 'express';
import User from './user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(404).send({ message: "Admin Not Found" });
        }
        if (admin.password !== password) {
            return res.status(401).send({ message: "Invalid Password." });
        }
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Authentication Successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Failed to login as Admin.", error);
        res.status(401).send({ message: "Failed to login as Admin." });
    }
});

export default router;
