const {nodePort} = require("../../config/config");

var http = require('http');
var app = require("./app");


var server = http.createServer(app);
server.listen(nodePort, () => {
  console.log(`Service started on port: ${nodePort}`)
});

