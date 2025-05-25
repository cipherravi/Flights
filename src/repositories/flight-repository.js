const { getLogger } = require("../config");
const logger = getLogger(__filename);
const CrudRepositoy = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
class FlightRepository extends CrudRepositoy {
  constructor() {
    super(Flight);
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
}

module.exports = FlightRepository;
