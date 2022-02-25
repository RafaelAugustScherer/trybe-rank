import Joi from 'joi';

const typeSchema = Joi.object({
  name: Joi.string().min(3).max(10).required()
    .messages({
      'any.required': '400|"name" is required!',
      'string.base': '400|"name" is a string',
      'string.empty': '400|"name" can not be empty',
      'string.min': '400|"name" must have a minimum length of 3',
      'string.max': '400|"name" must have a maximum lengrh of 10'
    }),
  color: Joi.string().length(6).required()
    .messages({
      'any.required': '400|"type" is required!',
      'string.base': '400|"type" is a string',
      'string.empty': '400|"type" can not be empty',
      'string.length': '400|"type" must have a length of 6',
    }),
  difficulty: Joi.number().integer().positive().min(1).max(5).required()
    .messages({
      'any.required': '400|"difficulty" is required!',
      'number.base': '400|"difficulty" is a number',
      'number.empty': '400|"difficulty" can not be empty',
      'number.positive': '400|"difficulty" minimum of 1',
      'number.max': '400|"difficulty" maximum of 5'
    }),
})

export default typeSchema;
