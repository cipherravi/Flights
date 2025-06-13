const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { sequelize } = require("./models");
const { serverConfig, getLogger } = require("./config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const logger = getLogger(__filename);
const apiRoutes = require("./routes");

app.use("/api", apiRoutes);

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).send("✅ DB connection success");
  } catch (err) {
    res.status(500).send("❌ DB connection failed");
  }
});

app.listen(serverConfig.PORT, () => {
  logger.info("Server started running at PORT :: " + serverConfig.PORT);
});
