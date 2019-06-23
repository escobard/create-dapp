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

    let receipt;

    if (global.ethereum === "ganache") {
      res.status(200).json(global.makePayment);

      let amountToWei = web3.utils.toWei(amount.toString(), "ether");

      contractInstance.methods.makePayment.send({
        from: user_pa,
        value: amountToWei
      });
      return setTimeout(async () =>{
        let paymentID = await contractInstance.methods.paymentID.call({
          from: user_pa
        });

        let currentPayment = paymentID - 1;

        let payment = await contractInstance.methods
          .fetchPayment(currentPayment)
          .call({
            from: user_pa
          });

        const prettyPayment = {
          user: payment.user,
          amount: web3.utils.fromWei(payment.amount.toString(), "ether")
        };

        currentPayment = currentPayment.toString();

        setTimeout(() => {
          global.makePayment = {
            status: `Donation ${currentPayment} created!`,
            result: "created",
            currentPayment,
            payment: prettyPayment
          };

          console.log(global.makePayment);

        }, 2500);
      }, 2500)

      /*
      return res.status(200).json(global.makePayment);
      */
    } else {
      res.status(200).json(global.makePayment);
      // creates raw transaction for makePayment()

      let rawTransaction = {
        method: await contractInstance.methods.makePayment(),
        public_address: user_pa,
        private_address: user_pk,
        receiver: contractAddress,
        amount,
        res,
        web3
      };

      receipt = await sendRawTransaction(rawTransaction);
    }

    console.log("Payment sent! Fetching ID...");


    let successfulTransaction = false;
    let transactionReceipt;

    for (let i = 1; i <= 2; i++) {
      setTimeout(async () => { transactionReceipt = await web3.eth.getTransactionReceipt(receipt) }, 3000);
    }

    console.log('TRANSACTION RECEIPT', transactionReceipt);

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
