require("dotenv").config();
const express = require("express");
const logger = require("../Task-Management/logger");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3020;

//middleware

app.use((req, res, next) => {
  logger.info(` ${req.method} ${req.path} Method`); // will record all the ports informations
  next();
});

//handling maintanance of routes
// app.use((req, res, next) => {
//   res.status(503).json({
//     Message: "Site is Undermaintanance please try after sometime",
//   });
// });

app.use(bodyParser.json());

app.use("/", routes);

mongoose
  .connect(process.env.mongoDB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((error) => {
    console.log("Cannot connect to MongoDB: " + error);
  });
