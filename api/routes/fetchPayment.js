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
  async (req, res) => {

    console.log("/fetchPayment POST request: ", req.headers);

    let {
      web3,
      contractInstance,
      contractAddress,
      body: { user_pa, user_pk, id }
    } = req;

    global.fetchPayment = {
      status: "payment Validated! Sending to Smart Contract...",
      result: "validated"
    };

    console.log(global.fetchPayment);

    let paymentID = await share.methods.fetchDonationID.call({from: owner_pu});

    // checks if contract has not store any payments
    if (paymentID === 1) {
      res
        .status(400)
        .json(
          "No payments have been created send a payment via /makePayment to test this route"
        );
    }

    res.status(200).json({
      healthy: true,
      process: global.environment,
      docker: process.env.DOCKER,
      ethereum: fetchEtherNetwork
    });
  }
);

module.exports = router;
