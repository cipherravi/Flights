const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");

router.post("/", AirportController.createAirport);

module.exports = router;
