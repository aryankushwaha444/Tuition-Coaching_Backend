import Joi from "joi";

export const createStudentSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  batch_id: Joi.string().uuid().optional(),
  date_of_birth: Joi.date().optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  parent_name: Joi.string().optional(),
  parent_contact: Joi.string().optional(),
  address: Joi.string().optional(),
  fees: Joi.number().optional(),
  due_amount: Joi.number().optional(),
});

export const updateStudentSchema = Joi.object({
  full_name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  batch_id: Joi.string().uuid().optional(),
  date_of_birth: Joi.date().optional(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  parent_name: Joi.string().optional(),
  parent_contact: Joi.string().optional(),
  address: Joi.string().optional(),
  fees: Joi.number().optional(),
  due_amount: Joi.number().optional(),
  status: Joi.string().optional(),
});
