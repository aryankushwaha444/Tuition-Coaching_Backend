// ============================================================
// 🧩 Utility — Utility functions and helpers
// ============================================================

import type { Response } from "express";
import logger from "@/lib/logger.lib";
import bcrypt from "bcrypt";

// ------------------------------------------------------
// successResponse() — Sends a standardized success response
// ------------------------------------------------------
export const successResponse = <T>(
  res: Response,
  statusCode: number = 200,
  message: string = "Success",
  data?: T
) => {
  // Log the success response
  logger.info(`${message}`, {
    statusCode,
    data,
  });

  // Send the response
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

// ------------------------------------------------------
// hashPassword() — Hashes a password using bcrypt
// ------------------------------------------------------
export const hashPassword = async (
  password: string,
  saltRounds: number
): Promise<string> => {
  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(saltRounds);

  // Return the hashed password
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// ------------------------------------------------------
// sevenDaysFromNow() — Returns the date seven days from now
// ------------------------------------------------------
export const sevenDaysFromNow = () => {
  // Calculate and return the date seven days from now
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
};
