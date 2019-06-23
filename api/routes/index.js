const routes = require("../constants/routes");

module.exports = app => {
  // lifecycle checks
  app.use(routes.health, require("../routes/health"));

  // form routes
  app.use(routes.postForm, require("../routes/postForm"));

  // ether routes
  app.use(routes.makePayment, require("../routes/makePayment"));
  app.use(routes.makePaymentStatus, require("../routes/makePaymentStatus"));
  app.use(routes.fetchPayment, require("../routes/fetchPayment"));
};
