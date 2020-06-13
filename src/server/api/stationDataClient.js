const needle = require('needle');
const {divvyStationsJSONUrl} = require('../../../config/config');

const getStations = async() => {
    const {body} =  await needle("get", divvyStationsJSONUrl);
    return body;
};

module.exports = {
    getStations
}