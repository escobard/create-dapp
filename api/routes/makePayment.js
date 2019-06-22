const router = require("express").Router(),
  sendRawTransaction = require("../utils/rawTransaction"),
  postPayableTransactionBaseValidation = require("../middlewares/postPayableTransactionBaseValidation"),
  postPayableTransactionEtherValidation = require("../middlewares/postPayableTransactionEtherValidation"),
  ethereumSetup = require("../middlewares/ethereumSetup");

router.post(
  "/",
  postPayableTransactionBaseValidation,
  ethereumSetup,
  postPayableTransactionEtherValidation,
  async (req, res) => {

    console.log("/makePayment POST request: ", req.headers);

    let {
      web3,
      contractInstance,
      contractAddress,
      body: { user_pa, user_pk, amount }
    } = req;

    // validates donation, sends response to UI stating transaction is being validated
    global.makePayment = {
      status: "payment Validated! Sending to Smart Contract...",
      result: "validated"
    };

    console.log(global.makePayment);
    res.status(200).json(global.makePayment);

    // creates raw transaction for makePayment()
    let rawTransaction = {
      method: contractInstance.methods.makePayment(),
      public_address: user_pa,
      private_address: user_pk,
      receiver: contractAddress,
      amount,
      res,
      web3
    }
    await sendRawTransaction(rawTransaction);

    console.log("Payment send! Fetching ID...");

    let paymentID = await contractInstance.methods.paymentID.call({
      from: user_pa
    });

    let currentDonation = donationID - 1;

    global.makeDonation = {
      status: `Donation created! Your donationID is: ${currentDonation}`,
      result: "created",
      donationID: currentDonation
    };

    console.log(global.makeDonation);

    res.status(200).json({
      healthy: true,
      process: global.environment
    });
  }
);

module.exports = router;
