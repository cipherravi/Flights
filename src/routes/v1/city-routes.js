const express = require("express");
const router = express.Router();

const { CityController } = require("../../controllers");
const { CityValidator } = require("../../middlewares");

router.post("/", CityValidator.validateCreateCity, CityController.createCity);
router.get("/:id", CityController.getCity);
router.get("/", CityController.getAllCities);
router.patch("/", CityController.updateCity);
router.delete("/:id", CityController.destroCity);

module.exports = router;
