const CreateDapp = artifacts.require("./CreateDapp.sol");

module.exports = function(deployer) {
  deployer.deploy(
    CreateDapp,
    { gas: 3000000 }
  );
};
