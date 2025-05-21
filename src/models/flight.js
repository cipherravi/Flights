"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplane",
      });
      Flight.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport",
      });
      Flight.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: "arrivalAirport",
      });
    }
  }
  Flight.init(
    {
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      departureAirportId: { type: DataTypes.INTEGER, allowNull: false },
      arrivalAirportId: { type: DataTypes.INTEGER, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureDate: { type: DataTypes.DATE, allowNull: false },
      arrivalDate: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      duration: { type: DataTypes.STRING, allowNull: false },
      availableSeat: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.ENUM("Scheduled", "Cancelled", "Completed") },
      isDirect: { type: DataTypes.BOOLEAN, allowNull: false },
      baggageAllowance: { type: DataTypes.STRING, allowNull: false },
      mealsIncluded: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "Flight",
      timestamps: true,
    }
  );
  return Flight;
};
