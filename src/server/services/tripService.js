/* eslint-disable no-undef */
const _ = require("lodash");
const moment = require("moment");
const { getTripsData } = require("../api");
const { formatDate } = require("../../../utils");
const {
  END_TIME,
  END_STATION_ID,
  BIRTH_YEAR
} = require("../../../data/tripDatafields");
const { AGE_GROUPS } = require("../../../data/tripAgeGroups");

const getTripsByEndStations = async (arrStationId, date) => {
  date = formatDate(date);
  const tripsDataStore = await getTripsData();

  return tripsDataStore.filter((trip) => arrStationId.includes(trip[END_STATION_ID])
      && formatDate(trip[END_TIME]) === date);
};

const getAgeGroup = (birthYear) => {
  if (!birthYear) {
    return AGE_GROUPS.AGE_UNKNOWN.name;
  }
  const age = moment().year() - birthYear;
  return _.find(AGE_GROUPS, ({ name, min, max }) => {
    if (age >= min && age <= max) {
      return name;
    }
  }).name;
};

const getAllAgeGroupsList = () => {
  var jsonObj = {};
  _.forEach(AGE_GROUPS, ({ name }) => {
    jsonObj[name] = 0;
  });
  return jsonObj;
};

const getRidersByAgeGroup = async (arrStationId, date, includeAllGroups) => {
  const trips = await getTripsByEndStations(arrStationId, date);
  let tripsByAgeGroup = _.countBy(trips.map((trip) => {
      return getAgeGroup(trip[BIRTH_YEAR]);
    }));
  if (includeAllGroups) {
    tripsByAgeGroup = _.merge(getAllAgeGroupsList(), tripsByAgeGroup);
  }

  return _(tripsByAgeGroup)
    .toPairs()
    .sortBy((tripByAgeGroup) => tripByAgeGroup[0])
    .map((tripByAgeGroup) => {
      return { age: tripByAgeGroup[0], count: tripByAgeGroup[1] };
    });
};

const getRecentTrips = async (arrStationId, date, rowsLimit = 20) => {
  const trips = await getTripsByEndStations(arrStationId, date);

  return trips
    .sort((a, b) => a[END_TIME] > b[END_TIME] ? -1 : 1)
    .slice(0, rowsLimit);
};

module.exports = {
  getRidersByAgeGroup,
  getRecentTrips
};
