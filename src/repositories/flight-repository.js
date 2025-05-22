const CrudRepositoy = require("./crud-repository");
const { Flight } = require("../models");
class FlightRepository extends CrudRepositoy {
  constructor() {
    super(Flight);
  }
}

module.exports = FlightRepository;
