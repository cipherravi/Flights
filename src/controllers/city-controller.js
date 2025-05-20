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

async function getAllCities(req, res) {
  try {
    const cities = await CityService.getAllCities();
    SuccessResponse.data = cities;
    SuccessResponse.message = "Sucessfully fetched all cities";
    logger.info("Sucessfully fetched all cities");
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroCity(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id)))
      throw new AppError("Send a valid Id", StatusCodes.BAD_REQUEST);

    const response = await CityService.destroCity(id);
    logger.info("Succesfully destroyed City with id :", id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Succesfully destroyed City with id :${id} `;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    //If it's an AppError then use it's own message status codes
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError ? error.message : "Something went wrong";

    ErrorResponse.error = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}
async function updateCity(req, res) {
  try {
    const { id, name } = req.body;

    if (!id || !name || isNaN(Number(id)))
      throw new AppError("Send valid Data", StatusCodes.BAD_REQUEST);

    const response = await CityService.updateCity(id, { name });
    logger.info("Succesfully Updated City with id :", id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Succesfully updated City with id :${id} `;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    //If it's an AppError then use it's own message status codes
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError ? error.message : "Something went wrong";

    ErrorResponse.error = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  getAllCities,
  updateCity,
  destroCity,
};
