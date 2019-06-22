const cors = require("cors"),
  { ethereum } = require("../ethereum/config");

const setOrigin = app => {
  // TODO this needs to be refactored to a helper - needs to handle GCP logic after containerization
  if (process.env.NODE_ENV === "production") {
    global.environment = "prod";
    app.use(cors({ origin: "https://share-ui.herokuapp.com" }));
  } else if(process.env.DOCKER === "dev") {
    app.use(cors({ origin: "http://localhost:1337" }));
    global.environment = "dev";
  }
  else{
    app.use(cors({ origin: "http://localhost:3000"}))
  }
};

const fetchEtherNetwork = ethereum.url;

const fetchContractAddress = ethereum.contractAddress;

const fetchOwnerAddress = ethereum.ownerAddress;

module.exports = {
  setOrigin,
  fetchEtherNetwork,
  fetchContractAddress,
  fetchOwnerAddress
};
