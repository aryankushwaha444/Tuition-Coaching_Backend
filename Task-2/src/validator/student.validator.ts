// ============================================================
// 🧩 StudentValidator — Validates student-related data
// ============================================================
import Joi from "joi";

// ------------------------------------------------------
// Interface for Create Student Body
// ------------------------------------------------------
export interface CreateStudentBody {
  name: string;
  batch_id?: number;
  phone?: string;
  email: string;
  address?: string;
  guardian_name?: string;
  guardian_phone?: string;
}

// ------------------------------------------------------
// createStudentSchema — Validates create student data
// ------------------------------------------------------
export const createStudentSchema = {
  body: Joi.object<CreateStudentBody>({
    name: Joi.string().min(3).max(50).required(),
    batch_id: Joi.number().optional(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional(),
    email: Joi.string().email().required(),
    address: Joi.string().max(100).optional(),
    guardian_name: Joi.string().min(3).max(50).optional(),
    guardian_phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional(),
  }),
};
