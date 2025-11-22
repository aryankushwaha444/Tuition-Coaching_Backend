import Joi from 'joi';

export const examResultCreateSchema = Joi.object({
  student_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Student ID must be a number',
    'number.positive': 'Student ID must be a positive number',
  }),
  exam_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Exam ID must be a number',
    'number.positive': 'Exam ID must be a positive number',
  }),
  marks_obtained: Joi.number().integer().min(0).required().messages({
    'number.base': 'Marks obtained must be a number',
    'number.min': 'Marks obtained cannot be negative',
  }),
  grade: Joi.string().max(10).optional().allow(''),
  status: Joi.string().valid('pass', 'fail', 'absent').default('pass').messages({
    'any.only': 'Status must be pass, fail, or absent',
  }),
});

export const examResultUpdateSchema = Joi.object({
  marks_obtained: Joi.number().integer().min(0).optional(),
  grade: Joi.string().max(10).optional().allow(''),
  status: Joi.string().valid('pass', 'fail', 'absent').optional(),
}).min(1);

