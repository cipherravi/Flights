const { FlightServcie } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const AppError = require("../utils/AppError");
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

async function getAllFlights(req, res) {
  try {
    const response = await FlightServcie.getAllFlights(req.query);

    if (response.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No flights found" });
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully find data";
    return res.status(StatusCodes.OK).json(SuccessResponse);
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

module.exports = { createFlight, getAllFlights };
