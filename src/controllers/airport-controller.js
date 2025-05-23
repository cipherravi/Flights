const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const AppError = require("../utils/AppError");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    const { name, code, address, cityId } = req.body;

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
async function getAllAirports(req, res) {
  try {
    const airports = await AirportService.getAllAirports();
    SuccessResponse.data = airports;
    SuccessResponse.message = "Sucessfully fetched all airports";
    logger.info("Sucessfully fetched all airports");
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirport(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id)))
      throw new AppError("Send a valid Id", StatusCodes.BAD_REQUEST);
    const airport = await AirportService.getAirport(id);
    logger.info("Succesfully fetched Airport with id :", id);
    SuccessResponse.data = airport;
    SuccessResponse.message = `Succesfully fetched Airport with id :${id} `;
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
async function updateAirport(req, res) {
  try {
    const { id, name, code, address, cityId } = req.body;

    if (!id || isNaN(Number(id)))
      throw new AppError("Send valid Data", StatusCodes.BAD_REQUEST);

    const response = await AirportService.updateAirport(id, {
      name,
      code,
      address,
      cityId,
    });
    logger.info("Succesfully Updated Airport with id :", id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Succesfully updated Airport with id :${id} `;
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

async function destroyAirport(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id)))
      throw new AppError("Send a valid Id", StatusCodes.BAD_REQUEST);

    const response = await AirportService.destroyAirport(id);
    logger.info("Succesfully destroyed Airport with id :", id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Succesfully destroyed Airport with id :${id} `;
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
  createAirport,
  getAllAirports,
  getAirport,
  updateAirport,
  destroyAirport,
};
