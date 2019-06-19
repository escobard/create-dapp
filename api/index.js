const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  { setOrigin } = require("./utils/network"),
  routes = require("./constants/routes"),
  port = routes.port;

app.use(bodyParser.json());

setOrigin(app);
require("./routes")(app);


let server = app.listen(port, () =>

  console.log(`Example app listening on port ${port}!`)
);

module.exports = server;
