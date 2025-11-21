import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

// Health check for monitoring tools (IMPORTANT for deployment)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Deployment-ready settings
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
