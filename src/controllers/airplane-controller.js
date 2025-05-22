const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const { AirplaneService } = require("../services");
const AppError = require("../utils/AppError");

async function createAirplane(req, res) {
  try {
    const { modelNumber, capacity } = req.body;

    const airplane = await AirplaneService.createAirplane({
      modelNumber,
      capacity,
    });
    logger.info("createAirplane in Airplane controller accessed succesfully");

    SuccessResponse.data = airplane;
    SuccessResponse.message = "Airplane created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessResponse.data = airplanes;
    SuccessResponse.message = "Sucessfully fetched all aiplanes";
    logger.info("Sucessfully fetched all aiplanes");
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplane(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id)))
      throw new AppError("Send a valid Id", StatusCodes.BAD_REQUEST);
    const airplane = await AirplaneService.getAirplane(id);
    logger.info("Succesfully fetched Airplane with id :", id);
    SuccessResponse.data = airplane;
    SuccessResponse.message = `Succesfully fetched Airplane with id :${id} `;
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

async function updateAirplane(req, res) {
  try {
    const { id, modelNumber, capacity } = req.body;

    if (!id || !modelNumber || !capacity || isNaN(Number(id)))
      throw new AppError("Send valid Data", StatusCodes.BAD_REQUEST);

    const response = await AirplaneService.updateAirplane(id, {
      modelNumber,
      capacity,
    });
    logger.info("Succesfully Updated Airplane with id :", id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Succesfully updated Airplane with id :${id} `;
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

async function destroyAirplane(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id)))
      throw new AppError("Send a valid Id", StatusCodes.BAD_REQUEST);

    const response = await AirplaneService.destroyAirplane(id);
    logger.info("Succesfully destroyed Airplane with id :", id);
    SuccessResponse.data = response;
    SuccessResponse.message = `Succesfully destroyed Airplane with id :${id} `;
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
  createAirplane,
  getAllAirplanes,
  getAirplane,
  updateAirplane,
  destroyAirplane,
};
