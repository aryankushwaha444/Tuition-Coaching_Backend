// ============================================================
// 🧩 StudentService — Handles student-related business logic
// ============================================================

import { CreateStudentBody } from "@/validator/student.validator";

// ------------------------------------------------------
// createStudentService() — Creates a new student
// ------------------------------------------------------
export const createStudentService = async (data: CreateStudentBody) => {
  const {
    name,
    batch_id,
    phone,
    email,
    address,
    guardian_name,
    guardian_phone,
  } = data;
};
