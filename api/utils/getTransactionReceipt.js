const getTransactionReceipt = async (web3, hash) =>{
  return await web3.eth.getTransactionReceipt(hash);
};

