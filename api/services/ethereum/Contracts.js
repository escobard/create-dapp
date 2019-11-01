const Ethereum = require("./");

/**
 * Child class of Ethereum
 * @dev to be gradually improved over time with new route helpers
 */

class Contract extends Ethereum {

  constructor(address, abi){
    super();

    this.contract ={
      contract_pa: address,
      contract_abi: abi
    };

  }

  /**
   * Sets up the contract instance
   */

  async setContract(){

    let { contract: {contract_abi, contract_pa}} = this;

    let web3 = await this.web3;
    return await new web3.eth.Contract(contract_abi, contract_pa);
  }

}

module.exports = Contract;