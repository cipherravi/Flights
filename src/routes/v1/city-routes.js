const express = require("express");
const router = express.Router();

const { CityController } = require("../../controllers");
const { validateCreateCity } = require("../../middlewares");

router.post("/", validateCreateCity, CityController.createCity);

module.exports = router;
