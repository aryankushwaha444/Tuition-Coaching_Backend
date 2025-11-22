import { Router } from "express"
import { registerUser, loginUser, refreshToken } from "../controllers/auth.controller"

const router = Router()

router.post("/register-user", registerUser)
router.post("/login", loginUser)
router.post("/refresh-token", refreshToken)

export default router