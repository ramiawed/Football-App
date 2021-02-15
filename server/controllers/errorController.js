import mongoose from "mongoose";
import AppError from "../utils/appError.js";
const { Error } = mongoose;

// send the error in the development mode
function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

// HANDLERS FOR ERRORS IN THE PRODUCTION MODE

// handle objectId cast error
function handleCastErrorDB(err) {
  const message = {
    [err.path]: `Invalid ${err.path}: ${err.value}.`,
  };

  return new AppError(message, 400);
}

// handle duplicates errors
function handleDuplicateError(err) {
  const { keyPattern } = err;
  const key = Object.keys(keyPattern)[0];
  const messages = {
    [key]: `${key} must be a unique`,
  };

  return new AppError(messages, 400);
}

// handle validations errors
function handleValidationError(err) {
  const { errors } = err;
  const messages = {};
  Object.keys(errors).forEach((key) => (messages[key] = errors[key].message));

  return new AppError(messages, 400);
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
}

// GLOBAL ERROR HANDLER FUNCTION THAT TAKES 4 PARAMETERS
// (ERROR, REQUEST, RESPONSE, NEXT)
function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    // Cast Error like Object_id
    if (err instanceof Error.CastError) error = handleCastErrorDB(error);

    // Duplicate Error
    if (err.code === 11000) error = handleDuplicateError(error);

    // Validation Error
    if (err.stack.startsWith("ValidationError"))
      error = handleValidationError(error);

    sendErrorProd(error, res);
  }
}

export default globalErrorHandler;
