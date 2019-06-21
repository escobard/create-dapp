const router = require("express").Router(),
  getStructureByIdBaseValidation = require("../middlewares/getStructureByIdBaseValidation"),
  getStructureByIdEtherValidation = require("../middlewares/getStructureByIdEtherValidation"),
  ethereumSetup = require("../middlewares/ethereumSetup");

router.post(
  "/",
  getStructureByIdBaseValidation,
  ethereumSetup,
  getStructureByIdEtherValidation,
  (req, res) => {
    console.log("/makePayment POST request: ", req.headers);

    res.status(200).json({
      healthy: true,
      process: global.environment
    });
  }
);

module.exports = router;
