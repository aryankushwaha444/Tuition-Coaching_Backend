import express from "express";
import studentRoutes from "./routes/student.routes.js";

const app = express();
app.use(express.json());

// Register routes
app.use("/api", studentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message,
    details: err.details || null
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default app;
