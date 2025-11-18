import repo from "../repositories/student.repository.js";

export default {
  async createStudent(payload) {
    return await repo.create(payload);
  },

  async getStudent(id) {
    const student = await repo.findById(id);
    if (!student) throw new Error("Student not found");
    return student;
  },

  async updateStudent(id, payload) {
    return await repo.update(id, payload);
  },

  async deleteStudent(id) {
    return await repo.delete(id);
  }
};
