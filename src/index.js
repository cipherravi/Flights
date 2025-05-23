const express = require("express");
const app = express();

const { serverConfig, getLogger } = require("./config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const logger = getLogger(__filename);
const apiRoutes = require("./routes");

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, async () => {
  logger.info("Server started running at PORT :: " + serverConfig.PORT);
  // const { Flight, Airplane, Airport, City } = require("./models");

  // const flight = await Flight.findByPk(2, {
  //   include: [
  //     {
  //       model: Airplane,
  //       as: "airplane", // from Flight model association
  //       attributes: ["modelNumber", "capacity"],
  //     },
  //     {
  //       model: Airport,
  //       as: "departureAirport", // from Flight model
  //       attributes: ["name", "code", "address"],
  //       include: [
  //         {
  //           model: City,
  //           as: "city", // from Airport model
  //           attributes: ["name"],
  //         },
  //       ],
  //     },
  //     {
  //       model: Airport,
  //       as: "arrivalAirport", // from Flight model
  //       attributes: ["name", "code", "address"],
  //       include: [
  //         {
  //           model: City,
  //           as: "city", // from Airport model
  //           attributes: ["name"],
  //         },
  //       ],
  //     },
  //   ],
  // });

  // console.log(JSON.stringify(flight, null, 2));
});
