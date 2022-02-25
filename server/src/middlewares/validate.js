import ValidateError from "../validateError.js";

const validate = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|')
    throw new ValidateError({ status, message })
  }

  next()
}

export default validate
