const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const AppError = require("../utils/AppError");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
  try {
    const { name } = req.body;

    const city = await CityService.createCity({ name });
    if (!city) throw new AppError("Failed to create city");
    logger.info("Successfully created city");

    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully created city";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError ? error.message : "Something went wrong";
    ErrorResponse.error = error;
    ErrorResponse.message = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
};
