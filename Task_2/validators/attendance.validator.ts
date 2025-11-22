import Joi from 'joi';

export const attendanceCreateSchema = Joi.object({
  student_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Student ID must be a number',
    'number.positive': 'Student ID must be a positive number',
  }),
  user_id: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number',
    'number.positive': 'User ID must be a positive number',
  }),
  batch_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Batch ID must be a number',
    'number.positive': 'Batch ID must be a positive number',
  }),
  date: Joi.date().iso().max('now').required().messages({
    'date.format': 'Date must be a valid ISO date',
    'date.max': 'Date cannot be in the future',
  }),
  status: Joi.string().valid('present', 'absent', 'late', 'half_day').required().messages({
    'any.only': 'Status must be present, absent, late, or half_day',
  }),
});

export const attendanceUpdateSchema = Joi.object({
  status: Joi.string().valid('present', 'absent', 'late', 'half_day').optional(),
  date: Joi.date().iso().max('now').optional(),
}).min(1);

export const bulkAttendanceSchema = Joi.array().items(
  Joi.object({
    student_id: Joi.number().integer().positive().required(),
    status: Joi.string().valid('present', 'absent', 'late', 'half_day').required(),
  })
).min(1);
