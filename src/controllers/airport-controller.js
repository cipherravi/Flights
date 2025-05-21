const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const AppError = require("../utils/AppError");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    const { name, code, address, cityId } = req.body;
    console.log(name, code, address, cityId);
    const airport = await AirportService.createAirport({
      name,
      code,
      address,
      cityId,
    });
    if (!airport) throw new AppError("Failed to create Airport");

    logger.info("SuccessFully created Airport");
    SuccessResponse.data = airport;
    SuccessResponse.message = "Successfully created Airport";
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

module.exports = { createAirport };
