require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3020;

//middle ware
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
