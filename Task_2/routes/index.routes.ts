import { Router } from "express"
import studentRoutes from "./student.routes"
import authRoutes from "./auth.routes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/student", studentRoutes)

export default router