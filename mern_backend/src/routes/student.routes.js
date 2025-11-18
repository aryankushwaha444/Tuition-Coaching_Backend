import express from 'express';
import { StudentService } from '../services/student.service.js';
import { studentRepository } from '../repositories/student.repository.js';
import { createStudentController } from '../controllers/student.controller.js';


const router = express.Router();
const service = new StudentService(studentRepository);
router.use('/students', createStudentController(service));


export default router;