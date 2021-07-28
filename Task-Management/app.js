require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3020;

//middleware

// app.use((req, res, next) => {
//   console.log(req.method, req.path); //winston log to be implemented
//   next();
// });

//handling maintanance
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
