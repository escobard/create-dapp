const mnemonic = require("./mnemonic.js");

let HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks:{
    development:{
      // TODO - make this variable so that host is normal if local vs local docker
      host: '0.0.0.0:8545', //"127.0.0.1", 
      network_id: 1234,
      gas: 4700000,
      gasPrice: 20 * 1000000000
    },
      solc: {
        version: "0.5.0"
      },
    rinkeby:{
      provider: () =>{
        // this comes from the infura dashboar, unique per infura project
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/47c181283cb345c19697f9403531914c')
      },
      network_id: 4,
      gas: 4612388,
      gasLimit: 2100000000000
    }
  }
};
