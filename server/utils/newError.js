class NewError extends Error {
  constructor(message, statusCode, errorDetails) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NewError;
