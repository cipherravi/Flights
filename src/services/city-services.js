const { CityRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const { getLogger } = require("../config");
const logger = getLogger(__filename);

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    logger.info("Successfully created city");
    return city;
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
      "Cannot create a city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    if (!city) {
      throw new AppError(
        "City Not Found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    }
    logger.info("Successfully fetched City with id :", id);
    return city;
  } catch (error) {
    logger.error("Failed to fetch City", error.message);

    // Don't override existing AppError
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot fetch details of City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllCities() {
  try {
    const cities = await cityRepository.getAll();
    logger.info("Successfully fetched Cities");
    return cities;
  } catch (error) {
    logger.error("Failed to fetch cities", error.message);

    throw new AppError(
      "Cannot fetch details of cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    if (!response)
      throw new AppError(
        "City not found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    logger.info("Successfully Destroyed City with id :", id);
    return response;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      `Failed to destroy City with id :${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateCity(id, { name }) {
  try {
    const response = await cityRepository.update(id, { name });
    if (!response)
      throw new AppError(
        "City not found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    logger.info("Successfully Updated City with id :", id);
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

    throw new AppError("Cannot Update City", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createCity,
  getCity,
  getAllCities,
  updateCity,
  destroCity,
};
