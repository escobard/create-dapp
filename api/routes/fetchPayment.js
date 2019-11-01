const router = require("express").Router(),
  getStructureByIdBaseValidation = require("../middlewares/getStructureByIdBaseValidation"),
  getStructureByIdEtherValidation = require("../middlewares/getStructureByIdEtherValidation"),
  ethereumSetup = require("../middlewares/ethereumSetup"),
  { fetchEtherNetwork } = require("../utils/network");

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

    let paymentID = await contractInstance.methods.paymentID.call({
      from: user_pa
    });

    // checks if contract has not store any payments
    if (paymentID === 1) {
      res
        .status(400)
        .json(
          "No payments have been created send a payment via /makePayment to test this route"
        );
    }

    console.log("Contract has payments! Fetching payment...");

    const payment = await contractInstance.methods
      .fetchPayment(id)
      .call({ from: user_pa });

    const prettyPayment = {
      user: payment.user,
      amount: web3.utils.fromWei(payment.amount.toString(), "ether"),
      id
    };

    global.fetchPayment = {
      status: "Payment fetched!",
      result: "fetched",
      payment: prettyPayment
    };

    console.log(global.fetchPayment);
    return res.status(200).json(global.fetchPayment);
  }
);

module.exports = router;
