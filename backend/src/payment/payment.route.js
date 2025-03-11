import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;

// Initiate Khalti Payment
router.post('/khalti/initiate', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: 'Amount is required' });
        }

        // console.log("Initiating payment with amount:", amount);

        const response = await fetch('https://a.khalti.com/api/v2/epayment/initiate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${KHALTI_SECRET_KEY}`
            },
            body: JSON.stringify({
                return_url: 'http://localhost:5173/payment-callback', // Updated return URL
                website_url: 'http://localhost:5173/',
                amount,
                purchase_order_id: `order-${Date.now()}`,
                purchase_order_name: 'Plant Order'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ success: false, message: data.detail || 'Payment initiation failed' });
        }

        res.json(data);
    } catch (error) {
        console.error('Payment initiation failed:', error);
        res.status(500).json({ success: false, message: 'Payment initiation failed' });
    }
});

// Verify Khalti Payment
router.post('/khalti/verify', async (req, res) => {
    try {
        const { pidx } = req.body; // Get payment ID from frontend

        if (!pidx) {
            return res.status(400).json({ success: false, message: 'Payment ID (pidx) is required' });
        }

        console.log("Verifying payment with pidx:", pidx);

        const response = await fetch('https://a.khalti.com/api/v2/epayment/lookup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${KHALTI_SECRET_KEY}`
            },
            body: JSON.stringify({ pidx })
        });

        const data = await response.json();
        console.log("Khalti Verification Response:", data);

        if (!response.ok || data.status !== 'Completed') {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }

        res.json({ success: true, message: 'Payment verified successfully' });
    } catch (error) {
        console.error('Payment verification failed:', error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
});

export default router;
