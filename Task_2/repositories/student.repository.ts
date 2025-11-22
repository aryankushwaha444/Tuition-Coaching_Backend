import { db } from "../utils/prisma";
import { Student, User } from "@prisma/client";

export class StudentRepository {
    async create(studentData: any) {
        return await db.student.create({
            data: studentData,
            include: {
                user: true,
                batch: true
            }
        });
    }

    async findAll(skip: number, take: number, where: any) {
        const [students, total] = await db.$transaction([
            db.student.findMany({
                skip,
                take,
                where,
                include: {
                    user: {
                        select: {
                            full_name: true,
                            email: true,
                            phone: true,
                            is_active: true,
                        },
                    },
                    batch: {
                        select: {
                            batch_name: true,
                            course_name: true,
                        },
                    },
                },
            }),
            db.student.count({ where }),
        ]);
        return { students, total };
    }

    async findById(student_id: string) {
        return await db.student.findUnique({
            where: { student_id },
            include: {
                user: {
                    select: {
                        full_name: true,
                        email: true,
                        phone: true,
                        is_active: true,
                    },
                },
                batch: true,
            },
        });
    }

    async update(student_id: string, data: any) {
        // Separate user data and student data if needed
        // For simplicity, assuming data contains fields for both or handled by service
        // But here we might need to update User and Student tables
        // Let's assume the service handles splitting or we do it here.
        // Given the schema, name/email/phone are in User, rest in Student.

        const { full_name, email, phone, ...studentData } = data;
        const userUpdateData: any = {};
        if (full_name) userUpdateData.full_name = full_name;
        if (email) userUpdateData.email = email;
        if (phone) userUpdateData.phone = phone;

        const student = await db.student.findUnique({ where: { student_id } });
        if (!student) return null;

        return await db.$transaction(async (prisma) => {
            if (Object.keys(userUpdateData).length > 0) {
                await prisma.user.update({
                    where: { user_id: student.user_id },
                    data: userUpdateData,
                });
            }

            if (Object.keys(studentData).length > 0) {
                await prisma.student.update({
                    where: { student_id },
                    data: studentData,
                });
            }

            return prisma.student.findUnique({
                where: { student_id },
                include: { user: true, batch: true },
            });
        });
    }

    async delete(student_id: string) {
        const student = await db.student.findUnique({ where: { student_id } });
        if (!student) return null;

        // Cascading delete should handle User if we delete User, but Student is child.
        // If we delete Student, User remains? Usually yes.
        // But if we want to remove the user account too:
        return await db.user.delete({
            where: { user_id: student.user_id },
        });
    }
}
