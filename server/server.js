import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";  // Already imported
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";

dotenv.config();

const app = express();

// FIXED: Full CORS + credentials
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "https://yourdomain.com" : "http://localhost:5173",  // Match your Vite port exactly!
  credentials: true
}));

// ADD: Parse cookies (critical for req.cookies in protect)
app.use(cookieParser());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// serve frontend
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "./client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});