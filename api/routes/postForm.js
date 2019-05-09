const router = require('express').Router(),
  postFormValidation = require("../middlewares/postFormValidation");

// the route here is replaced by the route passed within ./index.js
router.post('/', postFormValidation, (req, res) => {
  console.log('/postForm POST request: ', req.body);

  // TODO - update this route, determine server status (running on local vs prod) to navigator, version number of the app, etc
  res.status(200).json(
    {
      body: req.body
    });
});

module.exports = router;
