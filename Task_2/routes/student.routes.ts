import { Router } from "express";
import {
    createStudent,
    deleteStudent,
    getStudent,
    getStudents,
    updateStudent,
} from "../controllers/student.controller";

const router = Router();


router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
