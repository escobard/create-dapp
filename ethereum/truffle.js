const { mnemonic, owner } = require("./mnemonic.js");

let HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks:{
    development:{
      // TODO - make this variable so that host is normal if local vs local docker
      host: 'ganache', //"127.0.0.1", 
      port: 8545,
      network_id: "*",
      gas: 4700000,
      gasPrice: 20 * 1000000000
    },
      solc: {
        version: "0.5.0"
      },
    rinkeby:{

      provider: () =>{
        // TODO - fix hardcode
        return new HDWalletProvider(mnemonic)
      },
      network_id: 4,
      gas: 4612388,
      gasLimit: 2100000000000
    }
  }
};
