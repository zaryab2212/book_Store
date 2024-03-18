const newError = require("../utils/newError");

module.exports = (err, req, res, next) => {
  err.message = err.message || "Enternal Server Error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    error: err.stack,
    errorDetails: err.errorDetails,
  });
};
