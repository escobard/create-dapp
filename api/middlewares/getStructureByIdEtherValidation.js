const Validation = require("../utils/validation");

// TODO - update this logic with private address validation

/** Utility to validate null request values
 * @dev split apart from ether address validation, to fail fast if null
 */
module.exports = async (req, res, next) => {
  try {
    let {
      body: { user_pa, id },
      web3,
      contractInstance
    } = req;

    // setting address to lowercase, to avoid validation errors
    let validation = new Validation();


    let paymentID = await contractInstance.methods.paymentID.call({
      from: user_pa
    })

    let payment = await contractInstance.methods
      .fetchPayment(id)
      .call({
        from: user_pa
      });
      console.log('PAYMENTID', payment)
    await validation.isValidPublic(user_pa, web3, "Public address is invalid");

    await validation.customValidation(
      id >= paymentID,
      " DonationID does not exist"
    );

    console.log(user_pa)
    console.log(await contractInstance.methods.paymentID.call())

    await validation.customValidation(
      user_pa !== payment.user.toLowerCase(),
      " Unauthorized user"
    );

    let etherErrors = validation.getErrors();

    if (etherErrors.length >= 1) {
      console.error("Ether validation errors:", etherErrors);
      return res.status(400).json({
        status: "Ether validation errors:",
        errors: etherErrors.join()
      });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      status: "Ether validation error:",
      errors: err
    });
  }
};
