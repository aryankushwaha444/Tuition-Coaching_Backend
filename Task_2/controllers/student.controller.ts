import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../utils/catchAsyncErrors";
import { createStudentSchema, updateStudentSchema } from "../validators/student.validator";
import ErrorHandler from "../utils/ErrorHandler";
import { createStudentService, deleteStudentService, getAllStudentsService, getStudentByIdService, updateStudentService } from "../services/student.service";


export const createStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.body.user_id && req.user) {
            req.body.user_id = req.user.user_id;
        }

        const { error, value } = createStudentSchema.validate(req.body);
        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const result = await createStudentService({ user_id: value.user_id });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: result,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const getStudents = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string;

        const result = await getAllStudentsService(page, limit, search);

        res.status(200).json({
            success: true,
            data: result.students,
            total: result.total,
            page,
            limit,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const getStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const student = await getStudentByIdService(id);

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const updateStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const { error, value } = updateStudentSchema.validate(req.body);
        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const student = await updateStudentService(id, value);

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const deleteStudent = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await deleteStudentService(id);

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
