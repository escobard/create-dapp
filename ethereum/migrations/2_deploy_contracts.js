const CreateDapp = artifacts.require("./CreateDapp.sol"),
Migrations = artifacts.require('./Migrations.sol')

module.exports = function(deployer) {
  deployer.deploy(
    CreateDapp
  );
};
