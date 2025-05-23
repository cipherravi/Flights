const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const { getLogger } = require("../config");
const logger = getLogger(__filename);

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    logger.info("Successfully created Airports");
    return airport;
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
      "Cannot create a airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllAirports() {
  try {
    const airports = await airportRepository.getAll();
    logger.info("Successfully fetched Airports");
    return airports;
  } catch (error) {
    logger.error("Failed to fetch Airports", error.message);

    throw new AppError(
      "Cannot fetch details of Airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    if (!airport) {
      throw new AppError(
        "Airport Not Found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    }
    logger.info("Successfully fetched Airport with id :", id);
    return airport;
  } catch (error) {
    logger.error("Failed to fetch Airport", error.message);

    // Don't override existing AppError
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot fetch details of Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(id, { name, code, address, cityId }) {
  try {
    const response = await airportRepository.update(id, {
      name,
      code,
      address,
      cityId,
    });
    if (!response)
      throw new AppError(
        "Airport not found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    logger.info("Successfully Updated Airport with id :", id);
    return response;
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
      "Cannot Update Airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    if (!response)
      throw new AppError(
        "Airport not found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    logger.info("Successfully Destroyed Airport with id :", id);
    return response;
  } catch (error) {
    //Donn't override existing AppError
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      `Failed to destroy Airport with Id :${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAllAirports,
  getAirport,
  updateAirport,
  destroyAirport,
};
