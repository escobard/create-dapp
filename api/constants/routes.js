const routes = {
  port: process.env.PORT || 4000,
  health: "/health",
  postForm: "/postForm",
  makePayment: "/makePayment",
  makePaymentStatus: "/makePaymentStatus",
  fetchPayment: "/fetchPayment"
};

module.exports = routes;
