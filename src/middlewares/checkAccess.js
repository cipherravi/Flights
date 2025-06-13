const { StatusCodes } = require("http-status-codes");
const { rolesConfig } = require("../config");

function checkAccess(resource, action) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !user.role) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const allowedRoles = rolesConfig[resource]?.[action];
    if (!allowedRoles) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Access rule not defined" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
}

module.exports = checkAccess;
