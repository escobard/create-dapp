const router = require('express').Router();

router.post('/', (req, res) => {
  console.log('/makePayment POST request: ', req.headers)

  res.status(200).json(
    {
      healthy: true,
      process: global.environment,
    });
});

module.exports = router;
