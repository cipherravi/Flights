const { getLogger } = require("../config");
const logger = getLogger(__filename);
const CrudRepositoy = require("./crud-repository");
const { Flight } = require("../models");
class FlightRepository extends CrudRepositoy {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sortBy) {
    try {
      const response = await Flight.findAll({ where: filter, order: sortBy });
      logger.info("Successfully accessed getAllFlights");
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FlightRepository;
