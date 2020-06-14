/* eslint-disable no-undef */
const { cacheTripsData, cacheStationsData } = require("../api");

const cacheData = async () => {
  cacheStationsData();
  cacheTripsData();
};

module.exports = {
  cacheData
};
