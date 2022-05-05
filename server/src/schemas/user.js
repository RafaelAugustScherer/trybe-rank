import Joi from 'joi';

const create = Joi.object({
  username: Joi.string().pattern(/^[\w]{4,10}$/i).required()
    .messages({
      'any.required': '400|"username" is required',
      'string.base': '400|"username" must be of type string',
      'string.empty': '400|"username" cannot be empty',
      'string.pattern': '400|"username" must have between 4 and 10 characters',
    }),
  password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/).required()
    .messages({
      'any.required': '400|"password" is required',
      'string.base': '400|"password" must be of type string',
      'string.empty': '400|"password" cannot be empty',
      'string.pattern': '400|"password" must have one Uppercase, Lowercase and a number',
    })
});

const update = Joi.object({
  username: Joi.string().pattern(/[\w]{4,10}/i).required()
  .messages({
    'any.required': '400|"username" is required',
    'string.base': '400|"username" must be be of type string',
    'string.empty': '400|"username" cannot be empty',
    'string.pattern': '400|"username" must have between 4 and 10 characters',
  }),
  nickname: Joi.string().pattern(/[\w]{4,10}/i).required()
  .messages({
    'any.required': '400|"nickname" is required',
    'string.base': '400|"nickname" must be be of type string',
    'string.empty': '400|"nickname" cannot be empty',
    'string.pattern': '400|"nickname" must have between 4 and 10 characters',
  }),
  image_url: Joi.string().pattern(/^https?:.{5,100}/).allow('')
  .messages({
    'string.base': '400|"image_url" must be of type string',
    'string.pattern': '400|"image_url" must be a link to an image'
  }),
})

const updateQuestions = Joi.object({
  newQuestions: Joi.array().items(Joi.object()).required()
    .messages({
      'any.required': '400|"newQuestions" is required',
      'array.base': '400|"newQuestions" can only be of type array',
      'array.empty': '400|"newQuestions" cannot be empty',
    }),
  newQuiz: Joi.object().required()
    .messages({
      'any.required': '400|"newQuiz" is required',
      'object.base': '400|"newQuiz" can only be of type object',
      'object.empty': '400|"newQuiz" cannot be empty',
    })
});

export default { create, update, updateQuestions };
