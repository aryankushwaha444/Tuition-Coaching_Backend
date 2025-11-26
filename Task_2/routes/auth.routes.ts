import { Router } from "express"
import { registerUser, loginUser, refreshToken } from "../controllers/auth.controller"
import { myInfo } from "../controllers/user.controller"

const router = Router()

router.post("/register-user", registerUser)
router.post("/login-user", loginUser)
router.get("/refresh-token", refreshToken)


export default router