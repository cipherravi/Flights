const { getLogger } = require("../config");
const logger = getLogger(__filename);
const CrudRepositoy = require("./crud-repository");
const { Flight, Airplane, Airport, City, sequelize } = require("../models");
class FlightRepository extends CrudRepositoy {
  constructor() {
    super(Flight);
  }

  async getFlight(id) {
    try {
      const flight = await Flight.findByPk(id, {
        include: [
          {
            model: Airplane,
            as: "airplane",
            attributes: ["modelNumber", "capacity"],
          },
          {
            model: Airport,
            as: "departureAirport",
            attributes: ["name", "code", "address"],
            include: [
              {
                model: City,
                as: "city",
                attributes: ["name"],
              },
            ],
          },
          {
            model: Airport,
            as: "arrivalAirport",
            attributes: ["name", "code", "address"],
            include: [
              {
                model: City,
                as: "city",
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      return flight;
    } catch (error) {
      throw error;
    }
  }

  async getAllFlights(filter, sortBy) {
    try {
      const response = await Flight.findAll({
        where: filter,
        order: sortBy,
        include: [
          {
            model: Airplane,
            as: "airplane", // from Flight model association
            attributes: ["modelNumber", "capacity"],
          },
          {
            model: Airport,
            as: "departureAirport", // from Flight model
            attributes: ["name", "code", "address"],
            include: [
              {
                model: City,
                as: "city", // from Airport model
                attributes: ["name"],
              },
            ],
          },
          {
            model: Airport,
            as: "arrivalAirport", // from Flight model
            attributes: ["name", "code", "address"],
            include: [
              {
                model: City,
                as: "city", // from Airport model
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      logger.info("Successfully accessed getAllFlights");
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateRemainingSeats(id, seats, decrease) {
    let transaction = await sequelize.transaction();

    try {
      const flight = await Flight.findByPk(id, { transaction });

      if (!flight) {
        throw new Error("Flight not found");
      }

      let updatedSeats = decrease
        ? flight.availableSeat - seats
        : flight.availableSeat + seats;

      // Optionally, protect against negative seats
      if (updatedSeats < 0) {
        throw new Error("Available seats cannot be negative");
      }

      flight.availableSeat = updatedSeats;
      await flight.save({ transaction });
      await transaction.commit();

      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
