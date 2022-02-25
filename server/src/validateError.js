class ValidateError extends Error {
  constructor(params) {
    super(params.message)
    this.status = params.status
  }
}

export default ValidateError;
