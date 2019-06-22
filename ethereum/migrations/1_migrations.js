
const fs = require("fs"),
  Migrations = artifacts.require("./Migrations.sol"),
  CreateDapp = artifacts.require("./CreateDapp.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations).then(() => {
    return deployer.deploy(CreateDapp).then(async (instance) => {
      let config = {
        ethereum: {
          network: deployer.network,
          ownerAddress: await instance.Owner(),
          contractAddress: CreateDapp.address
        }
      };
      console.log("CONFIG", config);
      fs.writeFileSync(
        "./config/config.json",
        JSON.stringify(config, null, "\t"),
        "utf-8"
      );
    });
  });
};
