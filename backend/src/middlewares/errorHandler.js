import { BaseError, ValidationError, UniqueConstraintError } from 'sequelize';
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ValidationError) {
    statusCode = 400; // Bad Request
    message = err.errors.map(e => e.message).join(', ');
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 409; // Conflict
    message = err.errors.map(e => `${e.path} must be unique.`).join(', ');
  } else if (err instanceof BaseError) { // Generic Sequelize error
    statusCode = 400;
    message = err.message;
  } else {
    console.error(err);
  }

  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

export default errorHandler;