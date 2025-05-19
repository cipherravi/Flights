const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const { AirplaneRepository } = require("../repositories");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    logger.info("createAirplane in AirplaneService accessed sucessfully");

    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      logger.error(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    logger.error(error.message);

    throw new AppError(
      "Cannot create a airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    logger.info("Successfully fetched Airplanes");
    return airplanes;
  } catch (error) {
    logger.error("Failed to fetch Airplanes", error.message);

    throw new AppError(
      "Cannot fetch details of Airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    if (!airplane) {
      throw new AppError(
        "Airplane Not Found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    }
    logger.info("Successfully fetched Airplane with id :", id);
    return airplane;
  } catch (error) {
    logger.error("Failed to fetch Airplane", error.message);

    // Don't override existing AppError
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Cannot fetch details of Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    if (!response)
      throw new AppError(
        "Airplane not found , Please check Id",
        StatusCodes.NOT_FOUND
      );
    logger.info("Successfully Destroyed Airplane with id :", id);
    return response;
  } catch (error) {
    //Donn't override existing AppError
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      `Failed to destroy Airplane with Id :${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  destroyAirplane,
};
