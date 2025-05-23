const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");

router.post("/", AirportController.createAirport);
router.get("/", AirportController.getAllAirports);
router.get("/:id", AirportController.getAirport);
router.patch("/", AirportController.updateAirport);
router.delete("/:id", AirportController.destroyAirport);

module.exports = router;
