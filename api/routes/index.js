const routes = require("../constants/routes");

module.exports = app => {

  // lifecycle checks
  app.use(routes.health, require("../routes/health"));

  // form routes
  app.use(routes.postForm, require("../routes/postForm"))

  // ether routes
  app.use(routes.makeDonation, require("../routes/makeDonation"));
  app.use(routes.makeDonationStatus, require("../routes/makeDonationStatus"));
  app.use(routes.fetchDonation, require("../routes/fetchDonation"));
};
