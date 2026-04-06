const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  updateStatus,
} = require("../controllers/orderController");

// Public route 
router.post("/", createOrder);

// Private routes 
router.get("/", protect, getOrders);
router.put("/:id", protect, updateStatus);

module.exports = router;
module.exports = router;