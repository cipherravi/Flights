const express = require("express");
const app = express();
const { serverConfig, getLogger } = require("./config");
const apiRoutes = require("./routes");
const logger = getLogger(__filename);
app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  logger.info("Server started running at PORT :: " + serverConfig.PORT);
});
