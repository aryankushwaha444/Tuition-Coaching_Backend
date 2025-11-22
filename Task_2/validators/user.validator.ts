import Joi from 'joi';

export const userCreateSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 2 characters long',
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Username is required',
    'string.alphanum': 'Username must only contain alphanumeric characters',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  }),
  phone: Joi.string().pattern(/^\+?[\d\s-()]+$/).optional().allow('').messages({
    'string.pattern.base': 'Please provide a valid phone number',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),

  is_active: Joi.boolean().default(true),
});

export const userUpdateSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).optional(),
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^\+?[\d\s-()]+$/).optional().allow(''),
  role: Joi.string().valid('student', 'teacher', 'admin').optional(),
  is_active: Joi.boolean().optional(),
}).min(1);

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


