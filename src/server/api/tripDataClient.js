/* eslint-disable no-undef */
/* eslint-disable require-atomic-updates */
const fs = require("fs").promises;

// this value is set when server sarts
let tripsDataStore = null;

const getTripsData = async () => {
  // Trips data is read from local file and cached on server start
  if (!tripsDataStore) {
    await cacheTripsData();
  }
  return tripsDataStore;
};

const cacheTripsData = async () => {
  try {
    const tripData = (
      await fs.readFile("./data/Divvy_Trips_2019_Q2", "utf8")
    ).split("\n");

    // log when cache loaded
    console.log("Trips data loaded into cache");

    tripsDataStore = mapTripsToJSON(tripData.map((trip) => {
        return trip.split(",");
      }));
  } catch (err) {
    // log critical error
    console.error(`Error while catching trips data`, err);
  }
};

const mapTripsToJSON = (tripsArr) => {
  const header = tripsArr[0];
  const trips = tripsArr.slice(1);

  return trips.map((trip) => {
    var jsonObj = {};
    trip.forEach((tripFieldValue, index) => {
      jsonObj[header[index]] = tripFieldValue;
    });
    return jsonObj;
  });
};

module.exports = {
  cacheTripsData,
  getTripsData
};
