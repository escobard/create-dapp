const cors = require("cors"),
  { ethereum } = require("../ethereum/config");

const setOrigin = app => {
  // TODO this needs to be refactored to a helper - needs to handle GCP logic after containerization
  if (process.env.NODE_ENV === "production") {
    app.use(cors({ origin: "https://share-ui.herokuapp.com" }));
    global.environment = "prod";
    global.ethereum = "rinkeby";
  } else if (process.env.DOCKER === "dev") {
    app.use(cors({ origin: "http://localhost:1337" }));
    global.environment = "dev";
    global.ethereum = "ganache";
  } else {
    app.use(cors({ origin: "http://localhost:3000" }));
  }
};

// needs to be improved for ether networks beyond ganache / rinkeby
const fetchEtherNetwork =
  ethereum.network === "development"
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
