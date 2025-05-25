"use strict";
const { Model } = require("sequelize");
const { CLASS_TYPE } = require("../utils/common");
const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST } = CLASS_TYPE;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplane",
        onDelete: "CASCADE",
      });
    }
  }
  Seat.init(
    {
      row: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false },
      seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "compositeIndex",
      },
      seatClass: {
        type: DataTypes.ENUM,
        values: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST],
        defaultValue: ECONOMY,
        allowNull: false,
      },
      isBooked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "compositeIndex",
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
