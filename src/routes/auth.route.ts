// ============================================================
// 🧩 AuthRoute — Authentication related routes
// ============================================================
import { Router } from "express";
import regsiterContoller from "@/controllers/auth/regsiter.controller";
import asyncHandlerMiddleware from "@/middleware/async-handler.middleware";
import validateRequestMiddleware from "@/middleware/validate-request.middleware";
import { registerSchema } from "@/validator/auth.validator";

const router: Router = Router();

// ------------------------------------------------------
// Register Route
// ------------------------------------------------------
router
  .route("/register")
  .post(
    validateRequestMiddleware(registerSchema),
    asyncHandlerMiddleware(regsiterContoller)
  );

export default router;
