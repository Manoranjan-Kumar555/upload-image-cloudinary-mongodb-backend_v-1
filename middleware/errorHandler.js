const errorHandler = (error, req, res, next) => {
  const message = error.message || "Something went wrong...";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: message,
  });
};

module.exports = errorHandler;
