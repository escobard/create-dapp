const Validation = require("../utils/validation");

// TODO - update this logic with private address validation

/** Utility to validate null request values
 * @dev split apart from ether address validation, to fail fast if null
 */
module.exports = async (req, res, next) => {
  try {
    let {
      body: { user_pa, user_pk, id },
      web3,
      contractInstance
    } = req;

    // setting address to lowercase, to avoid validation errors
    let validation = new Validation();

    let paymentID = await contractInstance.methods.paymentID.call({
      from: user_pa
    });

    await validation.isValidPublic(user_pa, web3, "Public address is invalid");
    await validation.isValidPair(user_pk, user_pa, " Private Key is invalid");

    await validation.customValidation(
      id >= paymentID,
      " DonationID does not exist"
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
