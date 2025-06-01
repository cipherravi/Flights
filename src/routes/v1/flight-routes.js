const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightValidator } = require("../../middlewares");
router.post(
  "/",
  FlightValidator.validateCreateFlight,
  FlightController.createFlight
);
router.get("/", FlightController.getAllFlights);
router.get("/:id", FlightController.getFlight);
router.patch("/", FlightController.updateRemainingSeats);

module.exports = router;
