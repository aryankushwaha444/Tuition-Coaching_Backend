import express from "express";

export function createStudentController(service) {
  const router = express.Router();

  // Create student
  router.post("/", async (req, res, next) => {
    try {
      const student = await service.create(req.body);
      res.status(201).json(student);
    } catch (err) {
      next(err);
    }
  });

  // List all students
  router.get("/", async (req, res, next) => {
    try {
      const students = await service.getAll();
      res.json(students);
    } catch (err) {
      next(err);
    }
  });

  // Get single student by id
  router.get("/:id", async (req, res, next) => {
    try {
      const student = await service.getById(req.params.id);
      res.json(student);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const student = await service.update(req.params.id, req.body);
      res.json(student);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
