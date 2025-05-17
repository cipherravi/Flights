const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const { AirplaneService } = require("../services");

async function createAirplane(req, res, next) {
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
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
