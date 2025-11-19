// ============================================================
// 🧩 LoginController — Handles user login functionality
// ============================================================
import { LoginBody } from "@/validator/auth.validator";
import type { Request, Response, NextFunction } from "express";
import { loginService } from "@/services/auth.service";
import logger from "@/lib/logger.lib";
import APIError from "@/lib/api-error.lib";
import cookie from "@/lib/cookie.lib";
import { successResponse } from "@/utils/index.util";

// ------------------------------------------------------
// loginController() — Handles user login functionality
// ------------------------------------------------------
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Call the login service with the request body
  const { student, accessToken, refreshToken } = await loginService(
    req.body as LoginBody
  );

  // Validate the returned data
  if (!student) {
    // Log the error if student data is not returned
    logger.error("Login failed: Student data not returned from service.", {
      label: "LoginController",
    });

    // Throw an API error if student data is not returned
    return next(
      new APIError(500, "Login failed", {
        type: "InternalServerError",
        details: [
          {
            field: "student",
            message: "Student data not returned from service.",
          },
        ],
      })
    );
  }

  // Validate the tokens
  if (!accessToken || !refreshToken) {
    // Log the error if tokens are not returned
    logger.error("Login failed: Tokens not generated.", {
      label: "LoginController",
    });

    // Throw an API error if tokens are not returned
    return next(
      new APIError(500, "Login failed", {
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

  // Set the refresh token in an HTTP-only cookie
  cookie.set(res, "refreshToken", refreshToken);

  // Log the successful login
  logger.info(`Login successful for student ID ${student.id}.`, {
    label: "LoginController",
  });

  // Send a success response with the student data and access token
  successResponse(res, 200, "Login successful", {
    student,
    accessToken,
  });
};

export default loginController;
