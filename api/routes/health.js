const router = require('express').Router(),
  { fetchEtherNetwork, fetchContractAddress } = require("../utils/network")

router.get('/', (req, res) => {
    console.log('/health GET request: ', req.headers)

    res.status(200).json(
        {
            healthy: true,
            process: global.environment,
            ethereum: fetchEtherNetwork,
            contract: fetchContractAddress
        });
});

module.exports = router;
