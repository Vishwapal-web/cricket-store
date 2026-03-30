import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});