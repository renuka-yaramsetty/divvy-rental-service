/* eslint-disable no-undef */
const stationDataClient = require("./stationDataClient");
const tripDataClient = require("./tripDataClient");

module.exports = {
  ...stationDataClient,
  ...tripDataClient
};
