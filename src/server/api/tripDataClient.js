const fs = require('fs').promises;
const _ = require('lodash');
const moment = require('moment');
const {formatDate} = require('../../../utils');
const {END_TIME, END_STATION_ID, BIRTH_YEAR} = require('../../../data/tripDatafields')
const {AGE_GROUPS} = require('../../../data/tripAgeGroups')

const getTrips = async() => {
    const tripData = (await fs.readFile('./data/Divvy_Trips_2019_Q2', 'utf8')).split('\n');
    const header = tripData[0].split(',');
    const trips = tripData.slice(1).map(trip => {return trip.split(',')});
    return {header, trips};
};

const getTripsByEndStations = async(arrStationId, date) => {
    date = formatDate(date);
    const {header, trips} = await getTrips();
    const endStationIdIndex = header.indexOf(END_STATION_ID);
    const endDateIndex = header.indexOf(END_TIME);
    return {header, trips: trips.filter(trip => arrStationId.includes(trip[endStationIdIndex]) 
                        && formatDate(trip[endDateIndex]) === date)}
};

const mapTripsToJSON = async(header, trips) => {
    return trips.map(trip => {
        var jsonObj = {};
        trip.forEach((tripFieldValue, index) => {
            jsonObj[header[index]] = tripFieldValue;
        });
        return jsonObj;
    });
}

const getAgeGroup = (birthYear) => {
    if (!birthYear) {
        return AGE_GROUPS.AGE_UNKNOWN.name;
    }
    const age = moment().year() - birthYear; 
    return _.find(AGE_GROUPS, ({name, min, max}) => {
        if (age >= min && age <= max) {
            return name;
        }
    }).name;
};

const getAllAgeGroupsList = () => {
    var jsonObj = {};
    _.forEach(AGE_GROUPS, ({name}) => {
        jsonObj[name] = 0;
    });
    return jsonObj;
}

const getRidersByAgeGroup = async(arrStationId, date) => {
    const {header, trips} = await getTripsByEndStations(arrStationId, date);
    const birthYearIndex = header.indexOf(BIRTH_YEAR);
    const tripsByAgeGroup = _.countBy(trips.map(trip => {
                            return getAgeGroup(trip[birthYearIndex]);
                    }));
    const tripsByAgeGroup_All = _.merge(getAllAgeGroupsList(), tripsByAgeGroup);

    return _(tripsByAgeGroup_All).toPairs()
                        .sortBy((tripCount) => tripCount[0])
                        .map((tripCount) =>  {
                            return {age: tripCount[0], count: tripCount[1]};
                        })
                        .value()
};

const getRecentTrips = async(arrStationId, date, rowsLimit = 20) => {
    const {header, trips} = await getTripsByEndStations(arrStationId, date);
    const endDateIndex = header.indexOf(END_TIME);
    const recentTrips = trips.sort((a, b) => a[endDateIndex] > b[endDateIndex] ? -1 : 1)
                    .filter((trip, index) => index < rowsLimit);

     return mapTripsToJSON(header, recentTrips);
};

module.exports = {
    getTrips,
    getRidersByAgeGroup,
    getRecentTrips
}
