import express from "express";
import cors from "cors";  
import dotenv from "dotenv";
import mongoose from "mongoose";
import noteRoutes from "./routers/note.routers";
import { globalErrorHandler } from "./middlewares/error.middleware";

/* ===============================
   ENV CONFIG
================================ */
dotenv.config();

/* ===============================
   EXPRESS APP INIT
================================ */
const app = express();
app.use(globalErrorHandler)
/* ===============================
   MIDDLEWARES
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api", noteRoutes);

/* ===============================
   DATABASE CONNECTION
================================ */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

/* ===============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
