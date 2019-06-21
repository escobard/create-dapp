const Ethereum = require("./"),
  createDappABI = require('../../constants/createDappAbi');

/**
 * Child class of Ethereum
 * @dev to be gradually improved over time with new route helpers
 */

class Contract extends Ethereum{

  constructor(){
    super();

    this.contract ={
      contract_pu: process.env.SHARE_ADDRESS,
      contract_abi: ShareABI
    };

  }

  async setContract(){

    let { contract: {contract_abi, contract_pu}} = this;

    let web3 = await this.web3;
    return await web3.eth.Contract(contract_abi, contract_pu);
  }

}

module.exports = Contract;