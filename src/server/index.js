/* eslint-disable no-undef */
const { nodePort } = require("../../config/config");
const { cacheData } = require("./services/cacheService");

var http = require("http");
var app = require("./app");

var server = http.createServer(app);
server.listen(nodePort, () => {
  console.log(`Service started on port: ${nodePort}`);
  // cache data such as trips and stations on server start
  cacheData();
});
