import { validateStudent } from "../models/student.model.js";

export class StudentService {
  constructor(repository) {
    this.repo = repository;
  }

  async create(payload) {
    const { error, value } = validateStudent(payload);
    if (error) {
      const e = new Error("Validation failed");
      e.details = error.details.map((d) => d.message);
      e.status = 400;
      throw e;
    }
    // repository returns created record
    return await this.repo.create(value);
  }

  async getById(id) {
    if (!id) {
      const e = new Error("Missing id");
      e.status = 400;
      throw e;
    }
    const student = await this.repo.findById(id);
    if (!student) {
      const e = new Error("Student not found");
      e.status = 404;
      throw e;
    }
    return student;
  }

  async update(id, payload) {
    if (!id) {
      const e = new Error("Missing id");
      e.status = 400;
      throw e;
    }
    // validate partial payload by merging with existing field
    const existing = await this.repo.findById(id);
    if (!existing) {
      const e = new Error("Student not found");
      e.status = 404;
      throw e;
    }
    const merged = { ...existing, ...payload };
    const { error, value } = validateStudent(merged);
    if (error) {
      const e = new Error("Validation failed");
      e.details = error.details.map((d) => d.message);
      e.status = 400;
      throw e;
    }
    return await this.repo.update(id, value);
  }

  async delete(id) {
    if (!id) {
      const e = new Error("Missing id");
      e.status = 400;
      throw e;
    }
    const existing = await this.repo.findById(id);
    if (!existing) {
      const e = new Error("Student not found");
      e.status = 404;
      throw e;
    }
    const ok = await this.repo.delete(id);
    return ok;
  }
}
