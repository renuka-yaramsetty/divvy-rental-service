/* eslint-disable no-undef */
const moment = require("moment");
const dateFormat = "YYYY-MM-DD";

const formatDate = (date) => {
  return moment(date).format(dateFormat);
};

module.exports = {
  dateFormat,
  formatDate
};
