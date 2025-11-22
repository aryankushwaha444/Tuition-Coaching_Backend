import Joi from 'joi';

export const examCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Exam name is required',
    'string.min': 'Exam name must be at least 2 characters long',
  }),
  batch_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Batch ID must be a number',
    'number.positive': 'Batch ID must be a positive number',
  }),
  date: Joi.date().iso().min('now').required().messages({
    'date.format': 'Exam date must be a valid ISO date',
    'date.min': 'Exam date must be in the future',
  }),
  total_marks: Joi.number().integer().positive().required().messages({
    'number.base': 'Total marks must be a number',
    'number.positive': 'Total marks must be a positive number',
  }),
});

export const examUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  batch_id: Joi.number().integer().positive().optional(),
  date: Joi.date().iso().min('now').optional(),
  total_marks: Joi.number().integer().positive().optional(),
}).min(1);

