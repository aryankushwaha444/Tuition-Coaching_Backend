import { Router } from "express";
import {
    createStudent,
    deleteStudent,
    getStudent,
    getStudents,
    updateStudent,
} from "../controllers/student.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated);

router
    .route("/")
    .post(authorizeRoles("admin", "staff"), createStudent)
    .get(authorizeRoles("admin", "staff", "accountant"), getStudents);

router
    .route("/:id")
    .get(authorizeRoles("admin", "staff", "accountant"), getStudent)
    .put(authorizeRoles("admin", "staff"), updateStudent)
    .delete(authorizeRoles("admin"), deleteStudent);

export default router;