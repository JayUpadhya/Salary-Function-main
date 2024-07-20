const express = require('express');
const Order = require('../model/OrderForm/orderformModel');

const router = express.Router();

// Route for creating a new order
router.post("/", async (req, res) => {
    try {
        const { packagename, customername, phone, email, billingaddress, cardholdername, cardnumber, expirydate, cvv   } = req.body;
        
        if (!packagename || !customername || !phone || !email || !billingaddress || !cardholdername || !cardnumber || !expirydate || !cvv) {
            return res.status(400).json({ message: "Please provide all required fields: packagename, customername, phone, email, billingaddress" });
        }

        const newOrder = {
            packagename,
            customername,
            phone,
            email,
            billingaddress,
            cardholdername,
            cardnumber,
            expirydate,
            cvv,
            
        };

        const order = await Order.create(newOrder);
  
        return res.status(201).json(order);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for retrieving all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for retrieving a single order by ID
router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const order = await Order.findById(_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
