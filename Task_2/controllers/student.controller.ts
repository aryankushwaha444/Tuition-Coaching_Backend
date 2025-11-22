import { Request, Response, NextFunction } from "express";
import { StudentService } from "../services/student.service";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { createStudentSchema, updateStudentSchema } from "../validators/student.validator";
import ErrorHandler from "../utils/ErrorHandler";

const studentService = new StudentService();

export const createStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.user_id && req.user) {
        req.body.user_id = req.user.user_id;
    }
    const { error, value } = createStudentSchema.validate(req.body);
    if (error) {
        return next(new ErrorHandler(error.details[0].message, 400));
    }

    const result = await studentService.createStudent(value);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: result,
    });
});

export const getStudents = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const result = await studentService.getAllStudents(page, limit, search);

    res.status(200).json({
        success: true,
        data: result.students,
        total: result.total,
        page,
        limit,
    });
});

export const getStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);

    res.status(200).json({
        success: true,
        data: student,
    });
});

export const updateStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { error, value } = updateStudentSchema.validate(req.body);
    if (error) {
        return next(new ErrorHandler(error.details[0].message, 400));
    }

    const student = await studentService.updateStudent(id, value);

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student,
    });
});

export const deleteStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await studentService.deleteStudent(id);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
    });
});