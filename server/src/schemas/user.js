import Joi from 'joi';

const create = Joi.object({
  username: Joi.string().pattern(/^[\w]{4,10}$/i).required()
    .messages({
      'any.required': '400|"username" is required',
      'string.base': '400|"username" is a string',
      'string.empty': '400|"username" can not be empty',
      'string.pattern': '400|"username" must have between 4 and 10 of length',
    }),
  password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/).required()
    .messages({
      'any.required': '400|"password" is required',
      'string.base': '400|"password" is a string',
      'string.empty': '400|"password" can not be empty',
      'string.pattern': '400|"password" must have one Uppercase, Lowercase and a number',
    })
});

const update = Joi.object({
  username: Joi.string().pattern(/[\w]{4,10}/i).required()
  .messages({
    'any.required': '400|"username" is required',
    'string.base': '400|"username" is a string',
    'string.empty': '400|"username" can not be empty',
    'string.pattern': '400|"username" must have between 4 and 10 of length',
  }),
  nickname: Joi.string().pattern(/[\w]{4,10}/i).required()
  .messages({
    'any.required': '400|"nickname" is required',
    'string.base': '400|"nickname" is a string',
    'string.empty': '400|"nickname" can not be empty',
    'string.pattern': '400|"nickname" must have between 4 and 10 of length',
  }),
})

const updateQuestions = Joi.object({
  newQuestions: Joi.array().items(Joi.object()).required()
    .messages({
      'any.required': '400|"newQuestions" is required',
      'array.base': '400|"newQuestions" is an array',
      'array.empty': '400|"newQuestions" can not be empty',
    }),
  newQuiz: Joi.object().required()
    .messages({
      'any.required': '400|"newQuiz" is required',
      'object.base': '400|"newQuiz" is a object',
      'object.empty': '400|"newQuiz" can not be empty',
    })
});

export default { create, update, updateQuestions };
