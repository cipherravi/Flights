const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const {
  createFlight,
  getFlight,
  getAllFlights,
  updateRemainingSeats,
  destroyFlight,
} = FlightController;
const { FlightValidator } = require("../../middlewares");
const verifyUser = require("../../middlewares/verifyUser");
const checkAccess = require("../../middlewares/checkAccess");

const resource = "flight";

router.post(
  "/",
  FlightValidator.validateCreateFlight,
  verifyUser,
  checkAccess(resource, "create"),
  createFlight
);
router.get("/", getAllFlights);
router.get("/:id", getFlight);
router.patch(
  "/",
  verifyUser,
  checkAccess(resource, "update"),
  updateRemainingSeats
);
router.delete(
  "/:id",
  verifyUser,
  checkAccess(resource, "delete"),
  destroyFlight
);

module.exports = router;
