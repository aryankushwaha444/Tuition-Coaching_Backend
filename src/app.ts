// ============================================================
// 🧩 APP — Express application setup
// ============================================================
import express, { type Express } from "express";

const app: Express = express();

// ------------------------------------------------------
// Middlewares
// ------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
