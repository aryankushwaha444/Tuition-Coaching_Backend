// ============================================================
// 🧩 APP — Express application setup
// ============================================================
import express, { type Express } from "express";
import cookieParser from "cookie-parser";

// Initialize the Express application
const app: Express = express();

// ------------------------------------------------------
// Imports
// ------------------------------------------------------
import routes from "@/routes/index.route";
import globalErrorHandlerMiddleware from "./middleware/global-error-handler.middleware";

// ------------------------------------------------------
// Middlewares
// ------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(globalErrorHandlerMiddleware);

export default app;
