const routes = require("../constants/routes");

module.exports = app => {

  // lifecycle checks
  app.use(routes.health, require("../routes/health"));

  // form routes
  app.use(routes.postForm, require("../routes/postForm"))
};
