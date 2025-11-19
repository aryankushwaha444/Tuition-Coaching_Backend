// ============================================================
// 🧩 AuthService — Handles authentication related business logic
// ============================================================

import APIError from "@/lib/api-error.lib";
import jwtutil from "@/lib/jwt.lib";
import logger from "@/lib/logger.lib";
import {
  createToken,
  deleteRefreshToken,
  findStudentByEmail,
  isStudentExistsWithEmail,
  registerStudent,
  isTokenExists,
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

// ------------------------------------------------------
// logoutService() — Handles user logout logic
// ------------------------------------------------------
export const logoutService = async (token: string): Promise<boolean> => {
  // Validate the provided refresh token
  if (!token) {
    // Log the error for missing refresh token
    logger.error("Logout failed: No refresh token provided.", {
      label: "AuthService",
    });

    // Throw an API error for missing refresh token
    throw new APIError(400, "No refresh token provided", {
      type: "InvalidRequest",
      details: [
        {
          field: "refreshToken",
          message: "Refresh token is required for logout",
        },
      ],
    });
  }

  // Delete the refresh token from the database
  const deleteCount = await deleteRefreshToken(token);

  // If no token was deleted, it means the token was invalid
  if (deleteCount === 0) {
    // Log the error for invalid refresh token
    logger.error("Logout failed: Invalid refresh token.", {
      label: "AuthService",
    });

    // Throw an API error for invalid refresh token
    throw new APIError(400, "Invalid refresh token", {
      type: "InvalidToken",
      details: [
        {
          field: "refreshToken",
          message:
            "The provided refresh token is invalid or already logged out",
        },
      ],
    });
  }

  // Return true indicating successful logout
  return true;
};

// ------------------------------------------------------
// refreshTokenService() — Handles refresh token logic
// ------------------------------------------------------
export const refreshTokenService = async (oldToken: string) => {
  // Verify and decode the old refresh token
  const jwtPayload = jwtutil.verifyRefreshToken(oldToken);

  // Check if the old refresh token exists in the database
  const isToken = await isTokenExists(oldToken);

  // If the token does not exist, throw an error
  if (!isToken) {
    // Log the error for invalid refresh token
    logger.error("Refresh token is invalid or has been revoked.", {
      label: "AuthService",
    });

    // Throw an API error for invalid refresh token
    throw new APIError(401, "Invalid refresh token", {
      type: "InvalidToken",
      details: [
        {
          field: "refreshToken",
          message: "The provided refresh token is invalid or has been revoked",
        },
      ],
    });
  }

  // Generate new access and refresh tokens
  const newAccessToken = jwtutil.generateAccessToken({
    studentId: jwtPayload.studentId,
    role: jwtPayload.role,
  });

  // Generate new refresh token
  const newRefreshToken = jwtutil.generateRefreshToken({
    studentId: jwtPayload.studentId,
    role: jwtPayload.role,
  });

  // Delete the old refresh token from the database
  await deleteRefreshToken(oldToken);

  // Store the new refresh token in the database
  await createToken({
    student_id: jwtPayload.studentId, // Use studentId from the decoded payload
    token: newRefreshToken, // Use the newly generated refresh token
    expires_at: sevenDaysFromNow(), // Set expiration date to seven days from now
  });

  // Return the new tokens
  return { newAccessToken, newRefreshToken };
};
