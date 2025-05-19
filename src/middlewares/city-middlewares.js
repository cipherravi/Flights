const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/AppError");

function validateCreateCity(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while Adding city";
    ErrorResponse.error = new AppError(
      ["City not found in the incoming request body"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateCity,
};
