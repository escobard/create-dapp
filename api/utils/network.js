const cors = require("cors"),
  dotenv = require("dotenv"),
  { ethereum } = require("../ethereum/config");

dotenv.config();

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
    : "https://rinkeby.infura.io/v3/a07ed258a1924109a285a22a3778d0bb";

const fetchContractAddress =
  process.env.DOCKER === "dev"
    ? ethereum.contractAddress
    : process.env.CONTRACT_ADDRESS;

const fetchOwnerAddress =
  process.env.DOCKER === "dev" ? ethereum.ownerAddress : process.env.OWNER;
  
module.exports = {
  setOrigin,
  fetchEtherNetwork,
  fetchContractAddress,
  fetchOwnerAddress
};
