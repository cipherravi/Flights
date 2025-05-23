const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { AirplaneValidator } = require("../../middlewares");

router.post(
  "/",
  AirplaneValidator.validateCreateRequest,
  AirplaneController.createAirplane
);
router.get("/", AirplaneController.getAllAirplanes);
router.get("/:id", AirplaneController.getAirplane);
router.patch("/", AirplaneController.updateAirplane);
router.delete("/:id", AirplaneController.destroyAirplane);
module.exports = router;
