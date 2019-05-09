const Validation = require("../utils/validation");

/** Utility to validate postForm request values
 * @dev split apart from ether address validation, to fail fast if null
 */
module.exports = async (req, res, next) => {
  let { stringType, stringLength, numberType, numberMax } = req.body;

  let validation = new Validation();

  // null case values validation
  validation.exists(stringType, "stringType must exist");
  validation.exists(stringLength, "stringLength must exist");
  validation.exists(numberType, "numberType must exist");
  validation.exists(numberMax, "numberMax must exist");

  // rejects request in case of null values
  let nullErrors = validation.getErrors();

  console.log('MIDDLEWARE', stringType)

  if (nullErrors.length >= 1) {
    console.error("Null validation errors:", nullErrors);
    return res.status(400).json({
      status: "Null validation errors:",
      errors: nullErrors.join(", ")
    });
  }

  // data type validation
  validation.isString(stringType, "stringType must be a string");
  validation.isString(stringLength, "stringLength must be a string");
  validation.isNumber(numberType, "numberType must be a number");
  validation.isNumber(numberMax, "numberMax must be a number");

  let dataTypeErrors = validation.getErrors();

  if (dataTypeErrors.length >= 1) {
    console.error("Data type validation errors:", dataTypeErrors);
    return res.status(400).json({
      status: "Data type validation errors:",
      errors: dataTypeErrors.join()
    });
  }
  /*
    // business logic validation
    validation.exactLength(
      address_pu,
      42,
      "Public address must contain exactly 42 characters"
    );
    validation.exactLength(
      address_pr,
      64,
      " Private address must contain exactly 64 characters"
    );
    validation.customValidation(amount > 1, " Amount cannot be greater than 1");

    let businessErrors = validation.getErrors();

    if (businessErrors.length >= 1) {
      console.error("Business Logic validation errors:", businessErrors);
      return res.status(400).json({
        status: "Business Logic validation errors:",
        errors: dataTypeErrors.join()
      });
    }*/

  next();
};
