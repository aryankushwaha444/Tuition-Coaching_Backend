// ============================================================
// 🧩 AuthService — Handles authentication related business logic
// ============================================================

import { RegisterBody } from "@/validator/auth.validator";
import {
  createToken,
  isStudentExistsWithEmail,
  registerStudent,
} from "@/repositories/auth.repository";
import logger from "@/lib/logger.lib";
import APIError from "@/lib/api-error.lib";
import { hashPassword, sevenDaysFromNow } from "@/utils/index.util";
import jwtutil from "@/lib/jwt.lib";

export const registerService = async (data: RegisterBody) => {
  const { name, email, password } = data;

  const studentExists = await isStudentExistsWithEmail(email);

  if (studentExists) {
    logger.error(`Registration failed: Email ${email} is already in use.`, {
      label: "AuthService",
    });

    throw new APIError(400, "Email is already in use", {
      type: "ValidationError",
      details: [
        {
          field: "email",
          message: "Email is already registered",
        },
      ],
    });
  }

  const hashedPassword = await hashPassword(password, 10);

  const student = await registerStudent({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = jwtutil.generateAccessToken({
    studentId: student.id,
    role: "student",
  });

  const refreshToken = jwtutil.generateRefreshToken({
    studentId: student.id,
    role: "student",
  });

  await createToken({
    student_id: student.id,
    token: refreshToken,
    expires_at: sevenDaysFromNow(),
  });

  return {
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
    },
    accessToken,
    refreshToken,
  };
};
