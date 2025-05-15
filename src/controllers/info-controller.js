const { getLogger } = require("../config");
const logger = getLogger(__filename);
const { StatusCodes } = require("http-status-codes");

const info = (req, res) => {
  logger.info("Accessed Info route succesfully");

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Api is live",
    error: {},
    data: {},
  });
};
module.exports = { info };
