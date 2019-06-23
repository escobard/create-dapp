const router = require("express").Router();

// the route here is replaced by the route passed within ./index.js
router.get("/", (req, res) => {
  // checks if a donation has been made
  if (!global.makePayment) {
    return res.status(400).json({
      status: "No donation request active.",
      errors: "No donation request active, make a donation first."
    });
  }

  // checks if global donation has been sent to ethereum
  if (global.makePayment.result === "validated") {
    return res.status(200).json(global.makePayment);
  }

  // checks if global donation error has been thrown
  if (global.makePayment.result === "error") {
    res.status(400).json(global.makePayment);
    delete global.makePayment;
    return;
  }

  // checks if donation has been created
  if (global.makePayment.result === "created") {
    console.log('makePayment created:', global.makePayment)
    res.status(200).json(global.makePayment);

    // deletes to indicate no donation currently being created
    delete global.makePayment;
  }
});

module.exports = router;
