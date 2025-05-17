const { StatusCodes } = require("http-status-codes");
const about = (req, res) => {
  return res.status(StatusCodes.OK).json({
    name: "Ravi",
    age: "19",
    work: "Web developer",
  });
};

module.exports = { about };
