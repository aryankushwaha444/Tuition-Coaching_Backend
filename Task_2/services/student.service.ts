import {
    createStudent,
    findAllStudents,
    findStudentById,
    updateStudent,
    deleteStudent,
    findStudentByUserId
} from "../repositories/student.repository";
import { getUserById } from "../repositories/user.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { createStudentSchema, updateStudentSchema } from "../validators/student.validator";

export const createStudentService = async (data: any) => {

    const { error } = createStudentSchema.validate(data);
    if (error) throw new ErrorHandler(error.details[0].message, 400);

    const {
        user_id,
        batch_id,
        date_of_birth,
        gender,
        parent_name,
        parent_contact,
        address,
        fees,
        due_amount
    } = data;

    const user = await getUserById(user_id);
    if (!user) throw new ErrorHandler("User not found", 404);


    const existingStudent = await findStudentByUserId(user_id);



    if (existingStudent) throw new ErrorHandler("Student profile already exists for this user", 400);

    const studentData = {
        user_id,
        batch_id,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
        gender,
        parent_name,
        parent_contact,
        Address: address,
        fees,
        due_amount,
        enrolled_date: new Date(),
        status: "Active"
    };

    return await createStudent(studentData);
};

export const getAllStudentsService = async (
    page: number = 1,
    limit: number = 10,
    search?: string
) => {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
        where.OR = [
            { user: { full_name: { contains: search } } },
            { user: { email: { contains: search } } }
        ];
    }

    return await findAllStudents(skip, limit, where);
};

export const getStudentByIdService = async (id: string) => {
    const student = await findStudentById(id);
    if (!student) throw new ErrorHandler("Student not found", 404);
    return student;
};

export const updateStudentService = async (id: string, data: any) => {
    const { error } = updateStudentSchema.validate(data);
    if (error) throw new ErrorHandler(error.details[0].message, 400);

    const updated = await updateStudent(id, data);
    if (!updated) throw new ErrorHandler("Student not found", 404);
    return updated;
};

export const deleteStudentService = async (id: string) => {
    const deleted = await deleteStudent(id);
    if (!deleted) throw new ErrorHandler("Student not found", 404);
    return { message: "Student deleted successfully" };
};
