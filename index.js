const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./logger");
const genre = require("./routes/genres");
const movie = require("./routes/movies");
const user = require("./routes/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
console.log("Application Name:  " + config.get("name"));
console.log("Mail Server:   " + config.get("mail.host"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}
const isConfig = config.get("jwtPrivateKey");
if (!isConfig) {
  console.log(" FATAL : config file is not defined");
  process.exit(1);
}
app.use(logger);
app.use("/api/courses", genre);
app.use("/api/courses", movie);
app.use("/api/courses", user);

mongoose
  .connect("mongodb://localhost:27017/crudOperation")
  .then(() => console.log("MongoDb is connected"))
  .catch(() => console.log(Error.message));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is running at ${port} Port`));
