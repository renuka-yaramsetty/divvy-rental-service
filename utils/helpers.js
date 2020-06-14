/* eslint-disable no-undef */
const parseReqParamArr = (params, paramName) => {
  return [params[paramName]].concat(params[0].split("/").slice(1));
};

module.exports = {
  parseReqParamArr
};
