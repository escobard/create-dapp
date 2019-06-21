const routes = {
  port: process.env.PORT || 4000,
  health: "/health",
  postForm: "/postForm",
  makePayment: "/makePayment",
  fetchpayment: "/fetchPayment"
};

module.exports = routes;
