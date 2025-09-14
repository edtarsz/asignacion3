import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal Server Error",
  });
};

export default errorHandler;
