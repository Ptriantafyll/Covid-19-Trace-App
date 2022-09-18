const express = require("express");
const app = express();
const morgan = require("morgan"); //
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./api/routes/user");
const POIRoutes = require("./api/routes/POI");
const visitRoutes = require("./api/routes/visit");

require("dotenv").config();

// connect to db
mongoose.connect(
  "mongodb+srv://PanosTriantafyllopoulos:" +
    +process.env.MONGODB_ATLAS_PW +
    "@poidb.gojkx.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.Promise = global.Promise; // make mongoose a global promise to use from other files

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Handling cors errors
// append headers to the requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next(); // forward the request
});

// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/POI", POIRoutes);
app.use("/visit", visitRoutes);

// handle every request that reaches here (errors)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404; // didn't find a fitting route
  next(error); // forwards the error request
});

// handle forwarded error and errors thrown from anywhere else
app.use((error, req, res, next) => {
  res.status(error.status || 500); // other errors
  res.json({
    error: {
      message: error.message, // just print the error
    },
  });
});

module.exports = app;
