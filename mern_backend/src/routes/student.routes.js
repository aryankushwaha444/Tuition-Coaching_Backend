import express from "express";
import controller from "../controllers/student.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth(["Admin", "Student"]), controller.create);
router.get("/:id", auth(["Admin", "Student", "Accountant"]), controller.get);
router.put("/:id", auth(["Admin", "Student"]), controller.update);
router.delete("/:id", auth(["Admin"]), controller.remove);

export default router;
