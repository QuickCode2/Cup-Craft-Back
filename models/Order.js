const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    coffeeName: { type: String, required: true },
    address: { type: String, required: true },
    coffeeType: { type: String, enum: ["Normal", "Premium"], required: true },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "delivered", "cancelled"], default: "pending" }   // 💰 total price
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);