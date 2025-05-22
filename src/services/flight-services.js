const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    logger.info("Flight created successfully");
    return flight;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      logger.error(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    logger.error(error.message);

    throw new AppError(
      "Cannot create a flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createFlight };
