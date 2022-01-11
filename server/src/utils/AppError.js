class AppError extends Error {
  constructor(httpCode, message, isOperational = true) {
    super(message);

    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
