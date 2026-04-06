const Order = require("../models/Order");

// Create new order (public)
const createOrder = async (req, res) => {
  try {
    const { customerName, coffeeName, coffeeType, qty, total, address } = req.body;

    if (!customerName || !coffeeName || !coffeeType || !qty || !total || !address) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newOrder = new Order({
      customerName,
      coffeeName,
      coffeeType,          // Normal / Premium
      qty: Number(qty),    
      total: Number(total),
      address: address,
      status: "pending",   
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all orders (admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update order status (admin only)
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createOrder, getOrders, updateStatus };