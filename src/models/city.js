"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.hasMany(models.Airport, {
        foreignKey: "cityId",
        as: "airports",
        onDelete: "CASCADE",
      });
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: "City",
      timestamps: true,
    }
  );
  return City;
};
