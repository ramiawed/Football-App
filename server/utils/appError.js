class AppError extends Error {
  constructor(message, statusCode) {
    super();

    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // capture stackTrace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
