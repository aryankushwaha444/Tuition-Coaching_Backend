import service from "../services/student.service.js";
import { studentSchema } from "../repositories/student.validation.js";

export default {
  async create(req, res, next) {
    try {
      const { error } = studentSchema.validate(req.body);
      if (error) return next(error);

      const student = await service.createStudent(req.body);
      res.status(201).json({ success: true, student });
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      const student = await service.getStudent(req.params.id);
      res.json(student);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const student = await service.updateStudent(req.params.id, req.body);
      res.json(student);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await service.deleteStudent(req.params.id);
      res.json({ message: "Student deleted" });
    } catch (err) {
      next(err);
    }
  },
};
