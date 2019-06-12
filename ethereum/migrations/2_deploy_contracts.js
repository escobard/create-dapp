const CreateDapp = artifacts.require("./CreateDapp.sol"),
Migrations = artifacts.require('./Migrations.sol'),
fs = require('fs');


module.exports = function(deployer) {
  deployer.deploy(
    CreateDapp
  ).then(() => {
                let config = {
                    localhost: {
                        url: 'http://localhost:8545',
                        appAddress : CreateDapp.address,
                    }
                }
                fs.writeFileSync('../api/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
                fs.writeFileSync('../ui/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
});
};
