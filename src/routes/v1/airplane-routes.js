const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const {
  createAirplane,
  getAirplane,
  getAllAirplanes,
  getAirplaneWithSeats,
  updateAirplane,
  destroyAirplane,
} = AirplaneController;
const { AirplaneValidator } = require("../../middlewares");
const verifyUser = require("../../middlewares/verifyUser");
const checkAccess = require("../../middlewares/checkAccess");

const resource = "airplane";

router.post(
  "/",
  AirplaneValidator.validateCreateRequest,
  verifyUser,
  checkAccess(resource, "create"),
  createAirplane
);
router.get("/", verifyUser, checkAccess(resource, "read"), getAllAirplanes);
router.get("/:id", verifyUser, checkAccess(resource, "read"), getAirplane);
router.patch("/", verifyUser, checkAccess(resource, "update"), updateAirplane);
router.delete(
  "/:id",
  verifyUser,
  checkAccess(resource, "delete"),
  destroyAirplane
);
router.get(
  "/seats/:id",
  verifyUser,
  checkAccess(resource, "read"),
  getAirplaneWithSeats
);
module.exports = router;
