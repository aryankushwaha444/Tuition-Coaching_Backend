// ============================================================
// 🧩 Utility — Utility functions and helpers
// ============================================================

import type { Response } from "express";
import logger from "@/lib/logger.lib";

// ------------------------------------------------------
// successResponse() — Sends a standardized success response
// ------------------------------------------------------
export const successResponse = <T>(
	res: Response,
	statusCode: number = 200,
	message: string = "Success",
	data?: T,
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
