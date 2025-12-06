import { Router } from "express"
import studentRoutes from "./student.routes"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware"

const router = Router()

router.use("/auth", authRoutes)
router.use("/student", isAuthenticated, authorizeRoles("admin", "staff"), studentRoutes)
router.use("/user", isAuthenticated, authorizeRoles("admin", "staff"), userRoutes)
export default router