/* eslint-disable no-undef */
const { cacheTripsData, cacheStationsData } = require("../api");

const cacheData = () => {
  cacheStationsData();
  cacheTripsData();
};

module.exports = {
  cacheData
};
