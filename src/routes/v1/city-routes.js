const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { createCity, getCity, getAllCities, updateCity, destroCity } =
  CityController;
const { CityValidator } = require("../../middlewares");
const { validateCreateCity } = CityValidator;
const verifyUser = require("../../middlewares/verifyUser");
const checkAccess = require("../../middlewares/checkAccess");

const resource = "city";

router.post(
  "/",
  validateCreateCity,
  verifyUser,
  checkAccess(resource, "create"),
  createCity
);
router.get("/:id", getCity);

router.get("/", getAllCities);
router.patch("/", verifyUser, checkAccess(resource, "update"), updateCity);
router.delete("/:id", verifyUser, checkAccess(resource, "delete"), destroCity);

module.exports = router;
