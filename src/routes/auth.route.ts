// ============================================================
// 🧩 AuthRoute — Authentication related routes
// ============================================================
import { Router } from "express";
import regsiterContoller from "@/controllers/auth/register.controller";
import asyncHandlerMiddleware from "@/middleware/async-handler.middleware";
import validateRequestMiddleware from "@/middleware/validate-request.middleware";
import { loginSchema, registerSchema } from "@/validator/auth.validator";
import loginController from "@/controllers/auth/login.controller";

// Initialize Router
const router: Router = Router();

// ------------------------------------------------------
// Register Route
// ------------------------------------------------------
router.route("/register").post(
  validateRequestMiddleware(registerSchema), // Validate request body
  asyncHandlerMiddleware(regsiterContoller) // Handle registration logic
);

// ------------------------------------------------------
// Login Route
// ------------------------------------------------------
router.route("/login").post(
  validateRequestMiddleware(loginSchema), // Validate request body
  asyncHandlerMiddleware(loginController) // Handle login logic
);

export default router;
