const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { validateCreateRequest } = require("../../middlewares");

router.post("/", validateCreateRequest, AirplaneController.createAirplane);
module.exports = router;
