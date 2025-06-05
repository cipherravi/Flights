const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
}
console.log(process.env.BOOKING_SERVICE_URL);

module.exports = {
  PORT: process.env.PORT,
  BOOKING_SERVICE_URL: process.env.BOOKING_SERVICE_URL,
};
