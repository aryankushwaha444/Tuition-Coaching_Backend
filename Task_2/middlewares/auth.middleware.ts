import { NextFunction, Request } from "express";
import { catchAsyncError } from "./catchAsyncErrors";

export const protectRoute = catchAsyncError((req:Request, res:Response, next:NextFunction) => {
    
})
