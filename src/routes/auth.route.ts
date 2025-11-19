// ============================================================
// 🧩 AuthRoute — Authentication related routes
// ============================================================
import { Router } from "express";
import regsiterContoller from "@/controllers/auth/register.controller";
import asyncHandlerMiddleware from "@/middleware/async-handler.middleware";
import validateRequestMiddleware from "@/middleware/validate-request.middleware";
import { registerSchema } from "@/validator/auth.validator";

// Initialize Router
const router: Router = Router();

// ------------------------------------------------------
// Register Route
// ------------------------------------------------------
router.route("/register").post(
  validateRequestMiddleware(registerSchema), // Validate request body
  asyncHandlerMiddleware(regsiterContoller) // Handle registration logic
);

export default router;
