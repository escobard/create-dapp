const cors = require("cors"),
  { ethereum } = require("../ethereum/config");

const setOrigin = app => {

  // for prod - currently just heroku, future compute engine
  if (process.env.NODE_ENV === "production") {
    app.use(cors({ origin: "https://create-dapp.herokuapp.com" }));
    global.environment = "prod";
    global.ethereum = "rinkeby";
  }
  // for docker local dev and tests
  else if (process.env.DOCKER === "dev") {
    app.use(cors({ origin: "http://localhost:1337" }));
    global.environment = "dev";
    global.ethereum = "ganache";
  }
  // for npm local usage
  else {
    app.use(cors({ origin: "http://localhost:3000" }));
  }
};

// needs to be improved for ether networks beyond ganache / rinkeby
const fetchEtherNetwork =
  process.env.DOCKER === "dev"
    ? "http://ganache:8545"
    : "https://rinkeby.infura.io/v3/47c181283cb345c19697f9403531914c";

const fetchContractAddress = ethereum.contractAddress;

const fetchOwnerAddress = ethereum.ownerAddress;

module.exports = {
  setOrigin,
  fetchEtherNetwork,
  fetchContractAddress,
  fetchOwnerAddress
};
