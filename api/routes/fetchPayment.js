const router = require("express").Router(),
  getStructureByIdBaseValidation = require("../middlewares/getStructureByIdBaseValidation"),
  getStructureByIdEtherValidation = require("../middlewares/getStructureByIdEtherValidation"),
  ethereumSetup = require("../middlewares/ethereumSetup"),
  { fetchEtherNetwork } = require("../utils/network")

router.post(
  "/",
  getStructureByIdBaseValidation,
  ethereumSetup,
  getStructureByIdEtherValidation,
  (req, res) => {
    console.log("/fetchPayment POST request: ", req.headers);
    let {
      web3,
      contractInstance,
      contractAddress,
      body: { user_pa, user_pk, id }
    } = req;

    res.status(200).json({
      healthy: true,
      process: global.environment,
      docker: process.env.DOCKER,
      ethereum: fetchEtherNetwork
    });
  }
);

module.exports = router;
