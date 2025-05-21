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
  const { Flight, Airplane, Airport, City } = require("./models");
  // const flight = await Flight.create({
  //   airplaneId: 74,
  //   departureAirportId: 9,
  //   arrivalAirportId: 10, // for testing
  //   departureTime: new Date("2025-06-01T10:00:00"),
  //   arrivalTime: new Date("2025-06-01T12:00:00"),
  //   departureDate: "2025-06-01",
  //   arrivalDate: "2025-06-01",
  //   price: 5000,
  //   duration: "2h",
  //   availableSeat: 80,
  //   status: "Scheduled",
  //   isDirect: true,
  //   baggageAllowance: "15kg + 7kg cabin",
  //   mealsIncluded: true,
  // });

  const flight = await Flight.findByPk(3, {
    include: [
      {
        model: Airplane,
        as: "airplane", // from Flight model association
        attributes: ["modelNumber", "capacity"],
      },
      {
        model: Airport,
        as: "departureAirport", // from Flight model
        attributes: ["name", "code", "address"],
        include: [
          {
            model: City,
            as: "city", // from Airport model
            attributes: ["name"],
          },
        ],
      },
      {
        model: Airport,
        as: "arrivalAirport", // from Flight model
        attributes: ["name", "code", "address"],
        include: [
          {
            model: City,
            as: "city", // from Airport model
            attributes: ["name"],
          },
        ],
      },
    ],
  });

  console.log(JSON.stringify(flight, null, 2));
});
