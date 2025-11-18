import Joi from "joi";

export const studentSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  batch_id: Joi.string().required(),
  fees: Joi.number().required(),
  due_amount: Joi.number().optional(),
  join_date: Joi.date().optional()
});
