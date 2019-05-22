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
      errors: dataTypeErrors.join(", ")
    });
  }

  validation.customValidation(
    stringLength.length < 10,
    "stringLength length must be greater than 10"
  );

  validation.customValidation(
    numberMax < 10,
    "numberMax must be greater than 10"
  );

  let businessErrors = validation.getErrors();

  if (businessErrors.length >= 1) {
    console.error("Business Logic validation errors:", businessErrors);
    return res.status(400).json({
      status: "Business Logic validation errors:",
      errors: dataTypeErrors.join(", ")
    });
  }

  next();
};
