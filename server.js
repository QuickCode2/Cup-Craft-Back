const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// 🔌 DB CONNECT
connectDB();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/admin", require("./routes/adminRoutes"));   // Admin Auth
app.use("/api/orders", require("./routes/orderRoutes"));  // Orders (Protected)
app.use("/api/contact", require("./routes/contactRoutes")); // Contact


app.get("/", (req, res) => {
  res.send("API Running Successfully...");
});

//404 HANDLER (IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

//SERVER 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
