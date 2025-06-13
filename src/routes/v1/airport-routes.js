const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");
const {
  createAirport,
  getAirport,
  getAllAirports,
  updateAirport,
  destroyAirport,
} = AirportController;
const verifyUser = require("../../middlewares/verifyUser");
const checkAccess = require("../../middlewares/checkAccess");

const resource = "airport";

router.post("/", verifyUser, checkAccess(resource, "create"), createAirport);
router.get("/", verifyUser, checkAccess(resource, "read"), getAllAirports);
router.get("/:id", verifyUser, checkAccess(resource, "read"), getAirport);
router.patch("/", verifyUser, checkAccess(resource, "update"), updateAirport);
router.delete(
  "/:id",
  verifyUser,
  checkAccess(resource, "delete"),
  destroyAirport
);

module.exports = router;
