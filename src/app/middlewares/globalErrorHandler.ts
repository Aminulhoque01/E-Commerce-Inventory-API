import { ErrorRequestHandler } from 'express';
import { errorLogger } from '../../shared/logger'; // Log errors to file
import ApiError from '../../errors/ApiError'; // Custom error class
import config from '../../config'; // For checking environment

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Log error based on environment
  if (config.env === 'development') {
    console.log('🚨 globalErrorHandler ~~ ', error);
  } else {
    errorLogger.error('🚨 globalErrorHandler ~~ ', error);
  }

  let code = 500;
  let message = 'Something went wrong';
  let errorMessages: { path: string; message: string; }[] = [];

  // Handle specific error types
  if (error instanceof ApiError) {
    code = error.code;
    message = error.message || 'Something went wrong';
    errorMessages = [{ path: '', message }];
  }
  // Other error handling can go here for Mongoose validation, CastError, etc.

  // Send response
  res.status(code).json({
    code,
    message,
    error: errorMessages,
    stack: config.env === 'development' ? error?.stack : undefined, // Only in dev
  });
};

export default globalErrorHandler;
