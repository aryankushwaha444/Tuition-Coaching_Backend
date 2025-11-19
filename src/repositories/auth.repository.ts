// ============================================================
// 🧩 AuthRepository — Handles authentication related database operations
// ============================================================

import prisma from "@/config/prisma-client.config";
import type { RegisterBody } from "@/validator/auth.validator";

// ------------------------------------------------------
// isStudentExistsWithEmail() — Checks if a student exists with the given email
// ------------------------------------------------------
export const isStudentExistsWithEmail = async (
	email: string,
): Promise<boolean> => {
	// Check for existing student with the provided email
	const student = await prisma.student.count({ where: { email } });

	// Return true if a student exists, otherwise false
	return student > 0;
};

// ------------------------------------------------------
// registerStudent() — Registers a new student in the database
// ------------------------------------------------------
export const registerStudent = async ({
	email,
	name,
	password,
}: RegisterBody) => {
	// Create and return the new student record
	return await prisma.student.create({
		data: {
			email,
			name,
			password,
		},
	});
};

// ------------------------------------------------------
// createToken() — Creates a new token record in the database
// ------------------------------------------------------
export const createToken = async (data: IToken) => {
	// Create and return the new token record
	return await prisma.token.create({
		data,
	});
};
