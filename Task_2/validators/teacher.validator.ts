import Joi from 'joi';

export const teacherCreateSchema = Joi.object({
  user_id: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number',
    'number.positive': 'User ID must be a positive number',
  }),
  employee_number: Joi.string().max(50).optional().allow(''),
  specialization: Joi.string().max(100).optional().allow(''),
  hire_date: Joi.date().iso().max('now').optional().messages({
    'date.format': 'Hire date must be a valid ISO date',
    'date.max': 'Hire date cannot be in the future',
  }),
  status: Joi.string().valid('active', 'inactive', 'on_leave').default('active').messages({
    'any.only': 'Status must be active, inactive, or on_leave',
  }),
});

export const teacherUpdateSchema = Joi.object({
  employee_number: Joi.string().max(50).optional().allow(''),
  specialization: Joi.string().max(100).optional().allow(''),
  hire_date: Joi.date().iso().max('now').optional(),
  status: Joi.string().valid('active', 'inactive', 'on_leave').optional(),
}).min(1);
