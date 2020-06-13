const stationDataClient = require('./stationDataClient');
const tripDataClient = require('./tripDataClient');

module.exports = {
    ...stationDataClient,
    ...tripDataClient
}