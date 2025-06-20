const CrudRepository = require("./crud-repository");
const { Airplane, Seat } = require("../models");

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
  async getAirplaneWithSeats(id) {
    try {
      const response = await Airplane.findByPk(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async findAirplane(modelNumber) {
    try {
      const response = await Airplane.findOne({
        where: { modelNumber: modelNumber },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AirplaneRepository;
