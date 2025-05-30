"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Airplane.hasMany(models.Flight, {
        foreignKey: "airplaneId",
        as: "flights",
        onDelete: "CASCADE",
      });
      Airplane.hasMany(models.Seat, {
        foreignKey: "airplaneId",
        as: "seats",
      });
    }
  }
  Airplane.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
        },
      },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Airplane",
      timestamps: true,
    }
  );
  return Airplane;
};
