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

module.exports = {
  createCity,
};
