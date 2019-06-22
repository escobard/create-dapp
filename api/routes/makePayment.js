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
    await sendRawTransaction(
      contractInstance.methods.makePayment(),
      user_pa,
      user_pk,
      contractAddress,
      amount,
      res,
      web3
    );

    res.status(200).json({
      healthy: true,
      process: global.environment
    });
  }
);

module.exports = router;
