import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productsroutes from './routes/products.routes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// API Routes
app.use("/api/products", productsroutes);

// Deployment Configuration
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Catch-all route to serve frontend for unknown paths
  app.get("*", (req, res) => {
    console.log("Catch-all route triggered: ", req.url);
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start Server after connecting to DB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server started at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Exit with failure
  }
};

startServer();
