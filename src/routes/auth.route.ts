// ============================================================
// 🧩 AuthRoute — Authentication related routes
// ============================================================
import { Router } from "express";
import regsiterContoller from "@/controllers/auth/register.controller";
import asyncHandlerMiddleware from "@/middleware/async-handler.middleware";
import validateRequestMiddleware from "@/middleware/validate-request.middleware";
import { loginSchema, registerSchema } from "@/validator/auth.validator";
import loginController from "@/controllers/auth/login.controller";
import logoutController from "@/controllers/auth/logout.controller";
import authenticateMiddleware from "@/middleware/authenticate.middleware";

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

// ------------------------------------------------------
// Logout Route
// ------------------------------------------------------
router.route("/logout").post(
  authenticateMiddleware(), // Ensure user is authenticated
  asyncHandlerMiddleware(logoutController) // Handle logout logic
);

export default router;
