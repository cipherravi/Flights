const { FlightServcie } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const AppError = require("../utils/AppError");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req, res) {
  try {
    const {
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      departureTime,
      arrivalTime,
      departureDate,
      arrivalDate,
      price,
      duration,
      availableSeat,
      status,
      isDirect,
      baggageAllowance,
      mealsIncluded,
    } = req.body;

    console.log({
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      departureTime,
      arrivalTime,
      departureDate,
      arrivalDate,
      price,
      duration,
      availableSeat,
      status,
      isDirect,
      baggageAllowance,
      mealsIncluded,
    });

    const flight = await FlightServcie.createFlight({
      airplaneId,
      departureAirportId,
      arrivalAirportId,
      departureTime,
      arrivalTime,
      departureDate,
      arrivalDate,
      price,
      duration,
      availableSeat,
      status,
      isDirect,
      baggageAllowance,
      mealsIncluded,
    });
    if (!flight) throw new AppError("Failed to create Flight");
    logger.info("SuccessFully created Flight");
    SuccessResponse.data = flight;
    SuccessResponse.message = "Successfully created Flight";
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

module.exports = { createFlight };
