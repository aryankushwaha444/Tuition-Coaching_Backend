import Student from "../models/student.model.js";

export default {
  create(data) {
    return Student.create(data);
  },

  findById(id) {
    return Student.findById(id);
  },

  update(id, data) {
    return Student.findByIdAndUpdate(id, data, { new: true });
  },

  delete(id) {
    return Student.findByIdAndDelete(id);
  },
};
