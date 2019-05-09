const router = require('express').Router();

// the route here is replaced by the route passed within ./index.js
router.post('/', (req, res) => {
  console.log('/postForm POST request: ', req.headers);

  // TODO - update this route, determine server status (running on local vs prod) to navigator, version number of the app, etc
  res.status(200).json(
    {
      healthy: true,
      process: global.environment,
    });
});

module.exports = router;
