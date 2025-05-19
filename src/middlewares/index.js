const { validateCreateRequest } = require("./airplane-middlewares");
const { validateCreateCity } = require("./city-middlewares");

module.exports = {
  validateCreateRequest,
  validateCreateCity,
};
