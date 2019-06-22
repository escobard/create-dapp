const Validation = require("../utils/validation");

/** Utility to validate null request values
 * @dev split apart from ether address validation, to fail fast if null
 */
module.exports = async (req, res, next) => {
  let {body: {user_pa, user_pk}, web3 } = req;
  let validation = new Validation();

  await validation.isValidPublic(user_pa, web3, 'Public address is invalid');
  await validation.isValidPair(user_pk, user_pa, ' Private Key is invalid');

  let etherErrors = validation.getErrors();

  if (etherErrors.length >= 1){
    console.error("Ether validation errors:", etherErrors);
    return res.status(400).json({
      status: 'Ether validation errors:',
      errors: etherErrors.join()
    });
  }

  next();
};