const express = require("express");
const router = express.Router();

const { CityController } = require("../../controllers");
const { validateCreateCity } = require("../../middlewares");

router.post("/", validateCreateCity, CityController.createCity);
router.get("/", CityController.getAllCities);
router.patch("/", CityController.updateCity);
router.delete("/:id", CityController.destroCity);

module.exports = router;
