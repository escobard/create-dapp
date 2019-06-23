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

    let rawTransaction;
      res.status(200).json(global.makePayment);
      // creates raw transaction for makePayment()

      rawTransaction = {
        method: await contractInstance.methods.makePayment(),
        public_address: user_pa,
        private_address: user_pk,
        receiver: contractAddress,
        amount,
        res,
        web3
      };

      await sendRawTransaction(rawTransaction)

    let paymentID = await contractInstance.methods.paymentID.call({
      from: user_pa
    });

    let currentPayment = paymentID - 1;

    global.makePayment = {
      status: `Donation created!`,
      result: "created",
      currentPayment
    };

    console.log(global.makePayment);
  }
);

module.exports = router;
