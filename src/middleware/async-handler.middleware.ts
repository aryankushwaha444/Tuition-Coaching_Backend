// ============================================================
// 🧩 AsyncHandlerMiddleware — Middleware to handle async errors
// ============================================================
import { Request, Response, NextFunction } from "express";

// ------------------------------------------------------
// asyncHandlerMiddleware() — Middleware to handle async errors
// ------------------------------------------------------
const asyncHandlerMiddleware =
  (
    controller: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandlerMiddleware;
