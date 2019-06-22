const Validation = require("../utils/validation");

// TODO - update this logic with private address validation

/** Utility to validate null request values
 * @dev split apart from ether address validation, to fail fast if null
 */
module.exports = async (req, res, next) => {
  try {
    let {
      body: { user_pa, user_pk, id },
      web3
    } = req;

    // setting address to lowercase, to avoid validation errors
    let validation = new Validation();

    /* commented out for now, need to fix later
    let donationID = await share.methods.fetchDonationID.call({
      from: owner_pu
    });
    */

    await validation.isValidPublic(user_pa, web3, "Public address is invalid");
    await validation.isValidPair(user_pk, user_pa, " Private Key is invalid");

    /*await validation.customValidation(
      id >= donationID,
      " DonationID does not exist"
    );*/

    let etherErrors = validation.getErrors();

    if (etherErrors.length >= 1) {
      console.error("Ether validation errors:", etherErrors);
      return res.status(400).json({
        status: "Ether validation errors:",
        errors: etherErrors.join()
      });
    }
    /*

    // handles ether business logic
    let donation = await share.methods.fetchDonation(id).call({ from: owner_pu });
    console.log('DONATION', donation.donor === user_pa);

  // adding 3 seperate validation cases, custom validation only handles a SINGLE boolean
    await validation.customValidation(
      user_pa !== donation.donor,
      "Public address provided must exist within fetched donation"
    );

    await validation.customValidation(
      user_pa !== donation.donor,
      " Public address provided must exist within fetched donation"
    );


    await validation.customValidation(
      user_pa !== donation.charity,
      " Public address provided must exist within fetched donation"
    );
    console.log('ADDRESS / ID', user_pa, id)
    let etherBusinessErrors = validation.getErrors();

    // if only 2 errors are thrown, that means that 1/3 addresses is within the returned donation
    if (etherBusinessErrors.length === 3) {
      console.error("Ether business validation errors:", etherErrors);
      return res.status(400).json({
        status: "Ether business validation errors:",
        errors: "Public address provided must exist within fetched donation"
      });
    }
    */
    next();
  } catch (err) {
    return res.status(400).json({
      status: "Ether validation error:",
      errors: err
    });
  }
};
