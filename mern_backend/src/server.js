import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import loggerMiddleware from "./middlewares/loger.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import studentRoutes from "./routes/student.routes.js";

// Load .env
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(loggerMiddleware);

app.use("/students", studentRoutes);

app.use(errorHandler);

app.listen(5000, () => console.log("Server running on 5000"));
