import { Router } from "express"
import { myInfo } from "../controllers/user.controller"

const router = Router()

router.get("/me", myInfo)
export default router