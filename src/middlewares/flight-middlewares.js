const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/AppError");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const { validateFlightDate } = require("../utils/helpers/validateDate");

function validateCreateFlight(req, res, next) {
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
    if (!departureTime || !arrivalTime) {
      throw new AppError("Please Provide right Date", StatusCodes.BAD_REQUEST);
    }
    if (!duration || duration == "0h") {
      throw new AppError(
        "Please Provide right Duration",
        StatusCodes.BAD_REQUEST
      );
    }
    if (!departureAirportId || !arrivalAirportId) {
      throw new AppError("Provide Ids of Airports", StatusCodes.BAD_REQUEST);
    }
    console.log("DATE", departureDate, arrivalDate);
    const checkDate = validateFlightDate(departureTime, arrivalTime);
    if (!checkDate) {
      throw new AppError(
        "Wrong Arrival and Departure Date",
        StatusCodes.BAD_REQUEST
      );
    }
    if (!price || Number(price) < 1000 || isNaN(Number(price))) {
      throw new AppError("Wrong Price", StatusCodes.BAD_REQUEST);
    }
    if (!airplaneId || isNaN(Number(airplaneId))) {
      throw new AppError("Wrong airplaneId", StatusCodes.BAD_REQUEST);
    }
    if (!availableSeat || isNaN(Number(availableSeat))) {
      throw new AppError("Provide right available seats ");
    }
    if (!status || !["Scheduled", "Cancelled", "Completed"].includes(status)) {
      throw new AppError("Provide right status", StatusCodes.BAD_REQUEST);
    }

    if (!isDirect || !["true", "false"].includes(isDirect)) {
      throw new AppError(
        "Provide whether Direct or not",
        StatusCodes.BAD_REQUEST
      );
    }
    if (!baggageAllowance) {
      throw new AppError(
        "Provide whether baggage allowance or not",
        StatusCodes.BAD_REQUEST
      );
    }
    if (!mealsIncluded || !["true", "false"].includes(mealsIncluded)) {
      throw new AppError(
        "Provide whether meal provided or not",
        StatusCodes.BAD_REQUEST
      );
    }

    next();
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

module.exports = { validateCreateFlight };
