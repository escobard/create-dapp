const routes = {
  port: process.env.PORT || 4000,
  health: "/health",
  postForm: "/postForm",
  makePayment: "/makePayment",
  fetchPayment: "/fetchPayment"
};

module.exports = routes;
