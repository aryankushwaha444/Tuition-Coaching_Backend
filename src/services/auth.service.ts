// ============================================================
// 🧩 AuthService — Handles authentication related business logic
// ============================================================

import APIError from "@/lib/api-error.lib";
import jwtutil from "@/lib/jwt.lib";
import logger from "@/lib/logger.lib";
import {
  createToken,
  isStudentExistsWithEmail,
  registerStudent,
  findStudentByEmail,
} from "@/repositories/auth.repository";
import {
  comparePasswords,
  hashPassword,
  sevenDaysFromNow,
} from "@/utils/index.util";
import type { LoginBody, RegisterBody } from "@/validator/auth.validator";

// ------------------------------------------------------
// registerService() — Handles user registration logic
// ------------------------------------------------------
export const registerService = async (data: RegisterBody) => {
  // Destructure the registration data
  const { name, email, password } = data;

  // Check if a student with the given email already exists
  const studentExists = await isStudentExistsWithEmail(email);

  // If a student with the given email already exists, throw an error
  if (studentExists) {
    // Log the error
    logger.error(`Registration failed: Email ${email} is already in use.`, {
      label: "AuthService",
    });

    // Throw an API error
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

  // Hash the password before storing it
  const hashedPassword = await hashPassword(password, 10);

  // Register the new student
  const student = await registerStudent({
    name,
    email,
    password: hashedPassword,
  });

  // Generate access token for the new student
  const accessToken = jwtutil.generateAccessToken({
    studentId: student.id,
    role: "student",
  });

  // Generate refresh token for the new student
  const refreshToken = jwtutil.generateRefreshToken({
    studentId: student.id,
    role: "student",
  });

  // Store the refresh token in the database
  await createToken({
    student_id: student.id,
    token: refreshToken,
    expires_at: sevenDaysFromNow(),
  });

  // Return the student data along with the tokens
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

// ------------------------------------------------------
// loginService() — Handles user login logic
// ------------------------------------------------------
export const loginService = async (data: LoginBody) => {
  // Destructure the login data
  const { email, password } = data;

  // Find the student by email
  const student = await findStudentByEmail(email);

  // If no student is found, throw an error
  if (!student) {
    // Log the error
    logger.error(`Login failed: No student found with email ${email}.`, {
      label: "AuthService",
    });

    // Throw an API error
    throw new APIError(400, "Invalid email", {
      type: "AuthenticationError",
      details: [
        {
          field: "email",
          message: "No student found with the provided email",
        },
      ],
    });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordMatch = await comparePasswords(password, student.password);

  // If the passwords do not match, throw an error
  if (!isPasswordMatch) {
    // Log the error
    logger.error(`Login failed: Incorrect password for email ${email}.`, {
      label: "AuthService",
    });

    // Throw an API error
    throw new APIError(400, "Invalid email or password", {
      type: "AuthenticationError",
      details: [
        {
          field: "password",
          message: "Incorrect password",
        },
      ],
    });
  }

  // Generate new access token for the student
  const accessToken = jwtutil.generateAccessToken({
    studentId: student.id,
    role: "student",
  });

  // Generate refresh token for the student
  const refreshToken = jwtutil.generateRefreshToken({
    studentId: student.id,
    role: "student",
  });

  // Store the refresh token in the database
  await createToken({
    student_id: student.id,
    token: refreshToken,
    expires_at: sevenDaysFromNow(),
  });

  // Return the student data along with the tokens
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
