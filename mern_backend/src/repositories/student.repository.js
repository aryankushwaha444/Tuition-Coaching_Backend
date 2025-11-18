import { v4 as uuidv4 } from "uuid";

const storage = new Map();

export const studentRepository = {
  async findAll() {
    // Return an array of all students
    return Array.from(storage.values()).map((record) => structuredClone(record));
  },

  async create(student) {
    const id = uuidv4();
    const now = new Date();
    const record = {
      ...student,
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
    storage.set(id, record);
    return structuredClone(record);
  },

  async findById(id) {
    const record = storage.get(id);
    return record ? structuredClone(record) : null;
  },

  async update(id, updateData) {
    const existing = storage.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    storage.set(id, updated);
    return structuredClone(updated);
  },

  async delete(id) {
    return storage.delete(id);
  },
};
