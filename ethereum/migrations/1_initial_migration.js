var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations).then(() =>{
    deployer.deploy(CreateDapp).then(() => {
      let config = {
        ethereum: {
          url: "http://localhost:8545",
          ownerAddress: Migrations.owner,
          contractAddress: CreateDapp.address
        }
      };
      console.log('CONFIG', config)
      fs.writeFileSync(
        "./config/config.json",
        JSON.stringify(config, null, "\t"),
        "utf-8"
      );
    });
  });
};
