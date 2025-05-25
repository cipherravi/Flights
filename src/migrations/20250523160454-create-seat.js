"use strict";
/** @type {import('sequelize-cli').Migration} */
const { CLASS_TYPE } = require("../utils/common");
const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST } = CLASS_TYPE;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Seats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      row: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seatNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seatClass: {
        type: Sequelize.ENUM,
        values: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST],
        defaultValue: ECONOMY,
        allowNull: false,
      },
      isBooked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Seats");
  },
};
