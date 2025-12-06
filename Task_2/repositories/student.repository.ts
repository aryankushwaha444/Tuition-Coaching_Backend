import { db } from "../utils/prisma";

export const createStudent = async (studentData: any) => {
    
    return await db.student.create({
        data: studentData,
        include: {
            user: true,
            batch: true
        }
    });
};

export const findAllStudents = async (
    skip: number,
    take: number,
    where: any
) => {
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
                        is_active: true
                    }
                },
                batch: {
                    select: {
                        batch_name: true,
                        course_name: true
                    }
                }
            }
        }),
        db.student.count({ where })
    ]);

    return { students, total };
};

export const findStudentById = async (student_id: string) => {
    return await db.student.findUnique({
        where: { student_id },
        include: {
            user: {
                select: {
                    full_name: true,
                    email: true,
                    phone: true,
                    is_active: true
                }
            },
            batch: true
        }
    });
};

export const updateStudent = async (student_id: string, data: any) => {
    const { full_name, email, phone, ...studentData } = data;
    const userUpdateData: any = {};

    if (full_name) userUpdateData.full_name = full_name;
    if (email) userUpdateData.email = email;
    if (phone) userUpdateData.phone = phone;

    const student = await db.student.findUnique({ where: { student_id } });
    if (!student) return null;

    return await db.$transaction(async prisma => {
        if (Object.keys(userUpdateData).length) {
            await prisma.user.update({
                where: { user_id: student.user_id },
                data: userUpdateData
            });
        }

        if (Object.keys(studentData).length) {
            await prisma.student.update({
                where: { student_id },
                data: studentData
            });
        }

        return prisma.student.findUnique({
            where: { student_id },
            include: { user: true, batch: true }
        });
    });
};

export const deleteStudent = async (student_id: string) => {
    const student = await db.student.findUnique({ where: { student_id } });
    if (!student) return null;

    return await db.user.delete({
        where: { user_id: student.user_id }
    });
};

export const findStudentByUserId = async (user_id: string) => {
    return await db.student.findUnique({ where: { user_id } });
};
