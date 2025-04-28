const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const authenticateUser = require('../middleware/auth');
const razorpay = require('razorpay');
const fetch = require('node-fetch');

const instance = new razorpay({
    key_id: 'rzp_test_m5aHLAIsonEdcl',
    key_secret: 'd4yPUkQICK8NipjPEnV4XYex',
});

router.post('/create-order', (req, res) => {
    const { amount, currency, receipt } = req.body;

    if (!amount) {
        return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
        amount: amount * 100, // Convert amount to paise (multiply by 100)
        currency: currency || 'INR',
        receipt: receipt || 'receipt#1',
    };

    instance.orders.create(options, (err, order) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            orderId: order.id,
            amount: order.amount / 100, // Convert back to rupees for frontend
        });
    });
});

// ✅ **API: Place an Order**
router.post('/place', authenticateUser, (req, res) => {
    const { serviceId, providerId, price } = req.body;
    const customerId = req.user.userId; // Extract from token

    // Validate required fields
    if (!serviceId || !providerId || !price) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Call /create-order to generate the Razorpay order ID
    fetch('http://localhost:5001/api/orders/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price, currency: 'INR', receipt: 'receipt#1' })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.orderId) {
            return res.status(500).json({ error: 'Failed to create order' });
        }
        // Once the order is created, use the `orderId` in the frontend for Razorpay checkout
        res.status(200).json({
            message: "Order placed successfully!",
            orderId: data.orderId,
            amount: data.amount
        });
    })
    .catch(error => {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    });
});

// ✅ **API: Get User Orders**
router.get('/my-orders', authenticateUser, (req, res) => {
    const userId = req.user.userId;

    Order.getByUser(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(results);
    });
});

// ✅ **API: Update Order Status**
router.put('/update-status', authenticateUser, (req, res) => {
    const { orderId, status } = req.body;

    // Validate required fields
    if (!orderId || !status) {
        return res.status(400).json({ message: "Missing orderId or status" });
    }

    Order.updateStatus(orderId, status, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Order status updated successfully!" });
    });
});

module.exports = router;