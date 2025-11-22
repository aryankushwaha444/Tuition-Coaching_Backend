import bcrypt from "bcrypt";
import { StudentRepository } from "../repositories/student.repository";
import ErrorHandler from "../utils/ErrorHandler";
import { db } from "../utils/prisma";

export class StudentService {
    private studentRepository: StudentRepository;

    constructor() {
        this.studentRepository = new StudentRepository();
    }

    async createStudent(data: any) {
        const {
            user_id,
            batch_id,
            date_of_birth,
            gender,
            parent_name,
            parent_contact,
            address,
            fees,
            due_amount,
        } = data;

        const user = await db.user.findUnique({ where: { user_id } });
        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }

        const existingStudent = await db.student.findUnique({ where: { user_id } });
        if (existingStudent) {
            throw new ErrorHandler("Student profile already exists for this user", 400);
        }

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
            status: "Active",
        };

        return await this.studentRepository.create(studentData);
    }

    async getAllStudents(page: number = 1, limit: number = 10, search?: string) {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (search) {
            where.OR = [
                { user: { full_name: { contains: search } } },
                { user: { email: { contains: search } } },
            ];
        }

        return await this.studentRepository.findAll(skip, limit, where);
    }

    async getStudentById(id: string) {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            throw new ErrorHandler("Student not found", 404);
        }
        return student;
    }

    async updateStudent(id: string, data: any) {
        const student = await this.studentRepository.update(id, data);
        if (!student) {
            throw new ErrorHandler("Student not found", 404);
        }
        return student;
    }

    async deleteStudent(id: string) {
        const student = await this.studentRepository.delete(id);
        if (!student) {
            throw new ErrorHandler("Student not found", 404);
        }
        return { message: "Student deleted successfully" };
    }
}