/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const {
  validateDate,
  validateNumber,
  validateNumberArr,
  parseReqParamArr
} = require("../../../utils");
const { getStationsData } = require("../api");
const {
  getRidersByAgeGroup,
  getRecentTrips
} = require("../services/tripService");

router.get("/", async (req, res) => {
  try {
    return res.status(200).json(await getStationsData());
  } catch (err) {
    // log error
    console.error(err);
    res.status(500).json({ reason: "Error while getting stations" });
  }
});

router.get("/:stationId", async (req, res) => {
  const stationId = req.params.stationId;

  try {
    validateNumber(stationId);

    const { data: { stations } = {} } = await getStationsData();
    const station = stations.find((station) => station.station_id === stationId);
    if (station) {
      res.status(200).json(station);
    } else {
      res.status(404).json({ reason: "Not Found" });
    }
  } catch (err) {
    // log error
    console.error(err);
    res.status(500).json({
      reason: `Error while getting station details for statonId#${stationId}`,
      errors: err
    });
  }
});

router.get("/(:stationIds)*/ridersByAge", async (req, res) => {
  const arrStationId = parseReqParamArr(req.params, "stationIds");
  const { date, includeAllGroups } = req.query;

  try {
    validateNumberArr(arrStationId);
    validateDate(date);

    res
      .status(200)
      .json(await getRidersByAgeGroup(arrStationId, date, includeAllGroups === "1"));
  } catch (err) {
    // log error
    console.error(err);
    res.status(500).json({
      reason: `Error while getting riders by age group for statonIds#${arrStationId}`,
      errors: err
    });
  }
});

router.get("/(:stationIds)*/recentTrips", async (req, res) => {
  const arrStationId = parseReqParamArr(req.params, "stationIds");
  const date = req.query.date;
  const rowsLimit = 20;

  try {
    validateNumberArr(arrStationId);
    validateDate(date);

    res.status(200).json(await getRecentTrips(arrStationId, date, rowsLimit));
  } catch (err) {
    // log error
    console.error(err);
    res.status(500).json({
      reason: `Error while getting recent trip details for statonIds#${arrStationId}`,
      errors: err
    });
  }
});

module.exports = router;
