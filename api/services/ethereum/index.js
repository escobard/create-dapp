const Web3 = require("web3"),
  {
    fetchEtherNetwork,
  } = require("../../constants/network");

/**
 * Parent class for ethereum services, connects to web3 provider
 * @dev to be gradually improved over time with new route helpers
 */
class Ethereum {
  constructor() {
    // TODO - analyze utility, should no longer be necessary
    this.accounts = {
      owner_pu: process.env.OWNER_PUBLIC,
      owner_pr: process.env.OWNER_PRIVATE,
      charity_pu: process.env.CHARITY_PUBLIC,
      lottery_pu: process.env.LOTTERY_PUBLIC
    };

    this.web3 = this.web3Provider();
  }

  static async web3Provider() {
    return await new Web3(
      new Web3.providers.HttpProvider(
        fetchEtherNetwork()
      )
    );
  }

}

module.exports = Ethereum;
