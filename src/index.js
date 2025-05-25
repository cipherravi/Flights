const express = require("express");
const app = express();

const { serverConfig, getLogger } = require("./config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const logger = getLogger(__filename);
const apiRoutes = require("./routes");

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  logger.info("Server started running at PORT :: " + serverConfig.PORT);
});
