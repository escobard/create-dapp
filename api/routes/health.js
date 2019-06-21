const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('/health GET request: ', req.headers)

    res.status(200).json(
        {
            healthy: true,
            process: global.environment,
        });
});

module.exports = router;
