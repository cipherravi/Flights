const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const { getLogger } = require("../config");
const logger = getLogger(__filename);
const flightRepository = new FlightRepository();
const { Op } = require("sequelize");

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

async function getAllFlights({
  departureAirportId,
  arrivalAirportId,
  departureDate,
  price,
  travellers,
  sort,
}) {
  const filter = {};
  let sortBy = [];

  if (departureAirportId && arrivalAirportId) {
    filter.departureAirportId = departureAirportId;
    filter.arrivalAirportId = arrivalAirportId;
  }
  if (departureDate) {
    const start = new Date(`${departureDate}T00:00:00`);
    const end = new Date(`${departureDate}T23:59:59`);

    filter.departureDate = {
      [Op.between]: [start, end],
    };
  }
  if (price) {
    const [minPrice, maxPrice] = price.split("-");
    filter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  if (travellers) {
    filter.availableSeat = {
      [Op.gte]: travellers,
    };
  }
  if (sort) {
    const params = sort.split(",");
    console.log(params);
    const sortFilters = params.map((param) => {
      return param.split("_");
    });
    sortBy = sortFilters;
  }

  try {
    console.log(departureDate);
    const response = await flightRepository.getAllFlights(filter, sortBy);

    return response;
  } catch (error) {
    throw new AppError(
      "Cannot fetch all flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { createFlight, getAllFlights };
