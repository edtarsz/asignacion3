import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400; // Bad Request
    message = Object.values(err.errors).map(e => e.message).join(', ');
  } else if (err.code === 11000) {
    statusCode = 409; // Conflict
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} must be unique.`;
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
