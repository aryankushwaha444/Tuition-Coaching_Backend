import Joi from "joi";

export const studentSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(5).max(100).required(),
});

export function validateStudent(data) {
  return studentSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });
}
