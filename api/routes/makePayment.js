const router = require("express").Router(),
  postPayableTransactionBaseValidation = require("../middlewares/postPayableTransactionBaseValidation"),
  postPayableTransactionEtherValidation = require("../middlewares/postPayableTransactionEtherValidation"),
  ethereumSetup = require("../middlewares/ethereumSetup");

router.post(
  "/",
  postPayableTransactionBaseValidation,
  ethereumSetup,
  postPayableTransactionEtherValidation,
  (req, res) => {
    console.log("/makePayment POST request: ", req.headers);

    res.status(200).json({
      healthy: true,
      process: global.environment
    });
  }
);

module.exports = router;
