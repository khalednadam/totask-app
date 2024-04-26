const mongoose = require("mongoose");

const logger = require("./config/logger");
const app = require("./app");
const config = require("./config/config");
const io = require("./socket");
let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
});
