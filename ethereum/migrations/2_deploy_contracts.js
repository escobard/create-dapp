const CreateDapp = artifacts.require("./CreateDapp.sol"),
  Migrations = artifacts.require("./Migrations.sol"),
  fs = require("fs");

module.exports = function(deployer) {
  deployer.deploy(CreateDapp).then(() => {
    let config = {
      ganache: {
        url: "http://localhost:8545",
        ownerAddress: Migrations.owner,
        appAddress: CreateDapp.address
      }
    };
    console.log('CONFIG', config)
    fs.writeFileSync(
      "./config/config.json",
      JSON.stringify(config, null, "\t"),
      "utf-8"
    );
  });
};
