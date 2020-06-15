/* eslint-disable no-undef */
const needle = require("needle");
const moment = require("moment");
const {
  divvyStationsJSONUrl,
  stationsCacheExpiresInMins
} = require("../../../config/config");

let stationsDataStore = null;
let cacheExpirationDate = null;

const getStationsData = async () => {

  /*
   * Resets cache on server starts and if the cache has expired when getStationsData is called by a request.
   * Ideally cache should be reset with a callback when expired
   */
  if (!stationsDataStore || moment(cacheExpirationDate).isBefore(Date.now())) {
    await cacheStationsData();
  }
  return stationsDataStore;
};

const cacheStationsData = async () => {
  try {
    stationsDataStore = await (await needle("get", divvyStationsJSONUrl)).body;

    const dt = new Date();
    cacheExpirationDate = dt.setMinutes(dt.getMinutes() + stationsCacheExpiresInMins);

    console.info(`Stations data loaded into cache`);
  } catch (err) {
    // log critical error
    console.error(`Error while catching stations data`, err);
  }
};

module.exports = {
  cacheStationsData,
  getStationsData
};
