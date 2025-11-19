// ============================================================
// 🧩 RegsiterContoller — Handles user registration logic
// ============================================================
import { RegisterBody } from "@/validator/auth.validator";
import type { Request, Response, NextFunction } from "express";
import { registerService } from "@/services/auth.service";
import logger from "@/lib/logger.lib";
import APIError from "@/lib/api-error.lib";
import cookie from "@/lib/cookie.lib";
import { successResponse } from "@/utils/index.util";

const regsiterContoller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { student, accessToken, refreshToken } = await registerService(
    req.body as RegisterBody
  );

  if (!student) {
    logger.error("Registration failed: Student not created.", {
      label: "RegisterController",
    });
    return next(
      new APIError(500, "Registration failed", {
        type: "InternalServerError",
        details: [
          {
            field: "student",
            message: "Student registration failed due to server error.",
          },
        ],
      })
    );
  }

  if (!accessToken || !refreshToken) {
    logger.error("Registration failed: Tokens not generated.", {
      label: "RegisterController",
    });
    return next(
      new APIError(500, "Registration failed", {
        type: "InternalServerError",
        details: [
          {
            field: "tokens",
            message: "Token generation failed due to server error.",
          },
        ],
      })
    );
  }

  cookie.set(res, "refreshToken", refreshToken);

  successResponse(res, 201, "Registration successful", {
    student,
    accessToken,
  });
};

export default regsiterContoller;
