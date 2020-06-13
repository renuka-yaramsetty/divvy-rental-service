const express = require("express");
const router = express.Router();
const moment = require('moment');
const {validateDate, validateNumber, validateNumberArr} = require('../../../utils');
const {getStations, getRidersByAgeGroup, getRecentTrips} = require('../api');

router.get('/', async(req, res, next) => {
    try {
        return res.status(200).json(await getStations());
    }
    catch (err) {
        // log error
        console.log(err);
        res.status(500).json({reason: "Error while getting stations"});
    }
});

router.get('/:stationId', async(req, res, next) => {
    const stationId = req.params.stationId;
    try {
        validateNumber(stationId);

        const {data: {stations} = {}} = await getStations();
        const station = stations.find(station => station.station_id === stationId);
        if (station) {
            res.status(200).json(station);
        } else {
            res.status(404).json({reason: 'Not Found'});
        }
    }
    catch (err) {
        // log error
        console.log(err);
        res.status(500).json({reason: `Error while getting station details for statonId#${stationId}`, errors: err});
    }
});

router.get('/(:stationIds)*/ridersByAge', async(req, res, next) => {
    const arrStationId = [req.params.stationIds].concat(req.params[0].split('/').slice(1));
    const date = req.query.date;
    try {
        validateNumberArr(arrStationId);
        validateDate(date);

        res.status(200).json(await getRidersByAgeGroup(arrStationId, date));
    }
    catch (err) {
        // log error
        console.log(err);
        res.status(500).json({reason: `Error while getting riders by age group for statonIds#${arrStationId}`, errors: err});
    }
});


router.get('/(:stationIds)*/recentTrips', async(req, res, next) => {
    const arrStationId = [req.params.stationIds].concat(req.params[0].split('/').slice(1));
    const date = req.query.date;
    const rowsLimit = 20;
    try {
        validateNumberArr(arrStationId);
        validateDate(date);

        res.status(200).json(await getRecentTrips(arrStationId, date, rowsLimit));
    }
    catch (err) {
        // log error
        console.log(err);
        res.status(500).json({reason: `Error while getting recent trip details for statonIds#${arrStationId}`, errors: err});
    }
});

module.exports = router;