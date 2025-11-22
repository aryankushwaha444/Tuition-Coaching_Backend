import { NextFunction, Request, Response } from "express";

export const catchAsyncErrors = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
};
