// ============================================================
// 🧩 CreateStudentController — Handles creating a new student
// ============================================================
import { CreateStudentBody } from "@/validator/student.validator";
import type { Request, Response, NextFunction } from "express";
import { createStudentService } from "@/services/student.service";

// ------------------------------------------------------
// createStudentController() — Handles creating a new student
// ------------------------------------------------------
const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // const {} = await createStudentService(req.body as CreateStudentBody);
};

export default createStudentController;
