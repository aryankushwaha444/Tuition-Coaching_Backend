// ============================================================
// 🧩 StudentRoute — Handles student-related routes
// ============================================================

import createStudentController from "@/controllers/student/create-student.controller";
import asyncHandlerMiddleware from "@/middleware/async-handler.middleware";
import authenticateMiddleware from "@/middleware/authenticate.middleware";
import validateRequestMiddleware from "@/middleware/validate-request.middleware";
import { createStudentSchema } from "@/validator/student.validator";
import { Router } from "express";

// Initialize Router
const router: Router = Router();

// ------------------------------------------------------
// Create Student Route
// ------------------------------------------------------
router.route("/").post(
  authenticateMiddleware(["admin", "accountant", "staff"]), // Ensure user is authenticated and has proper role
  validateRequestMiddleware(createStudentSchema), // Validate request body
  asyncHandlerMiddleware(createStudentController) // Handle create student logic
);

export default router;
