import Joi from 'joi';

const questionSchema = Joi.object({
  question: Joi.string().min(8).max(200).required()
    .messages({
      'any.required': '400|"question" is required!',
      'string.base': '400|"question" is a string',
      'string.empty': '400|"question" can not be empty',
      'string.min': '400|"question" must have a minimum length of 8',
      'string.max': '400|"question" must have a maximum lengrh of 150'
    }),
  type: Joi.string().min(3).max(15).required()
    .messages({
      'any.required': '400|"type" is required!',
      'string.base': '400|"type" is a string',
      'string.empty': '400|"type" can not be empty',
      'string.min': '400|"type" must have a minimum length of 3',
      'string.max': '400|"type" must have a maximum lengrh of 15'
    }),
  difficulty: Joi.string().min(5).max(20).required()
    .messages({
      'any.required': '400|"difficulty" is required!',
      'string.base': '400|"difficulty" is a string',
      'string.empty': '400|"difficulty" can not be empty',
      'string.min': '400|"difficulty" must have a minimum length of 5',
      'string.max': '400|"difficulty" must have a maximum lengrh of 20'
    }),
  answers: Joi.array().items(Joi.string()).min(2).max(4).required()
    .messages({
      'any.required': '400|"answers" is required!',
      'array.base': '400|"answers" is an array',
      'array.type': '400|"answers" is an array with strings',
      'array.min': '400|"answers" must have a minimum length of 2',
      'array.max': '400|"answers" must have a maximum lengrh of 4'
    }),
})

export default questionSchema;
