const router = require("express").Router(),
  getStructureByIdBaseValidation = require("../middlewares/getStructureByIdBaseValidation"),
  getStructureByIdEtherValidation = require("../middlewares/getStructureByIdEtherValidation"),
  ethereumSetup = require("../middlewares/ethereumSetup");

router.get(
  "/",
  getStructureByIdBaseValidation,
  ethereumSetup,
  getStructureByIdEtherValidation,
  (req, res) => {
    console.log("/fetchPayment GET request: ", req.headers);
    let {
      web3,
      share,
      body: { user_pa, user_pk, id },
      contract: { contract_pu }
    } = req;

    res.status(200).json({
      healthy: true,
      process: global.environment
    });
  }
);

module.exports = router;
