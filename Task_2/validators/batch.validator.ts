import Joi from 'joi';

export const batchCreateSchema = Joi.object({
  batch_name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Batch name is required',
    'string.min': 'Batch name must be at least 2 characters long',
  }),
  course_name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Course name is required',
  }),
  teacher_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Teacher ID must be a number',
    'number.positive': 'Teacher ID must be a positive number',
  }),
  start_date: Joi.date().iso().required().messages({
    'date.format': 'Start date must be a valid ISO date',
    'any.required': 'Start date is required',
  }),
  end_date: Joi.date().iso().min(Joi.ref('start_date')).optional().messages({
    'date.format': 'End date must be a valid ISO date',
    'date.min': 'End date must be after start date',
  }),
  schedule: Joi.string().max(200).optional().allow(''),
});

export const batchUpdateSchema = Joi.object({
  batch_name: Joi.string().min(2).max(100).optional(),
  course_name: Joi.string().min(2).max(100).optional(),
  teacher_id: Joi.number().integer().positive().optional(),
  start_date: Joi.date().iso().optional(),
  end_date: Joi.date().iso().optional(),
  schedule: Joi.string().max(200).optional().allow(''),
}).min(1);

