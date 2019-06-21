const Web3 =require("web3"),
  ShareABI = require("../constants/share_abi");

/**
 * Parent class for ethereum services, connects to web3 provider
 * @dev to be gradually improved over time with new route helpers
 */
class Ethereum {

  constructor() {

    // TODO - analyze utility, should no longer be necessary
    this.accounts ={
      owner_pu: process.env.OWNER_PUBLIC,
      owner_pr: process.env.OWNER_PRIVATE,
      charity_pu: process.env.CHARITY_PUBLIC,
      lottery_pu: process.env.LOTTERY_PUBLIC
    }

    this.web3 = this.web3Provider();

  }

  async web3Provider(){

    let web3 = await new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/47c181283cb345c19697f9403531914c"
      )
    );

    this.runtime = "infura";
    return web3;

    /* TODO - GANACHE - connects to ganache if dev, commented out for v1
    if (process.env.NODE_ENV === "dev") {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      runtime = "ganache";
    } else {
      // this needs to be a new infura provider, replacing the current one which is for the starNotary contract
      web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://rinkeby.infura.io/v3/47c181283cb345c19697f9403531914c"
        )
      );
      console.log("INFURA");
      runtime = "infura";
    }*/

  }

  // TODO refactor rawTransaction util into this file
}

module.exports= Ethereum;