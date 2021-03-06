/* eslint-disable no-undef */
const express = require("express");
const { authToken } = require("../../config/config");
const app = express();
const helmet = require("helmet");
const stations = require("./routes/stations");

app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") res.sendStatus(200);
  else {
    next();
  }
});

app.use("/stations", verifyToken, stations);
app.get("/", verifyToken, (req, res) => {
  res.status(200).json({ status: "healthy" });
});

function verifyToken(req, res, next) {
  const authorization = req.headers["authorization"];

  if (authorization) {
    if (authorization === authToken) {
      next();
    } else {
      //Unauthorized
      res.sendStatus(401);
    }
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
module.exports = app;
