import { Prisma } from '@prisma/client';
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400; // Bad Request
    message = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        statusCode = 409;
        message = `A record with this ${err.meta.target.join(', ')} already exists.`;
        break;
      case 'P2025':
        statusCode = 404;
        message = 'The requested record does not exist.';
        break;
      default:
        statusCode = 400;
        message = err.message;
        break;
    }
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