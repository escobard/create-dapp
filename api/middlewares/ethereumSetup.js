const Contract = require("../services/ethereum/Contracts"),
  CreateDappAbi = require("../constants/createDappAbi"),
  { fetchContractAddress } = require("../utils/network");

module.exports = async (req, res, next) => {

  // init utils class
  const contract = new Contract(fetchContractAddress, CreateDappAbi);

  // set web3
  req.web3 = await contract.web3;

  // set contracts
  req.contractInstance = await contract.setContract();
  req.contractAddress = contract.contract.contract_pa;

  next();
};