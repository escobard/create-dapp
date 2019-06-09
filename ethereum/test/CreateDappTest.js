

// this grabs the CreateDapp.sol file within /contracts
const CreateDapp = artifacts.require("./CreateDapp.sol"),
  truffleAssert = require('truffle-assertions');

// extracts the accounts array from the contract
contract("CreateDapp", accounts => {
  // TODO - Testing contract address by instance here: https://truffleframework.com/docs/truffle/testing/writing-tests-in-solidity#example

  // sets all addresses globally for re-use
  let owner = accounts[0],
  user = accounts[3],
  amount = web3.utils.toWei('0.1', "ether");
  beforeEach(async () => {
    this.contract = await CreateDapp.new({
      from: owner
    });
  });

  describe("Tests makePayment", () => {

    it("owner can make payment", async () => {
      await this.contract.makePayment({ from: owner, value: amount });
      let paymentID = await this.contract.paymentID();

      assert.equal(paymentID, 2);
    });

    it("user can make payment", async () => {
      await this.contract.makePayment({ from: user, value: amount });
      let paymentID = await this.contract.paymentID();

      assert.equal(paymentID, 2);
    });
  });

  describe("Tests fetchPayments", () => {

    beforeEach(async () => {
      await this.contract.makePayment({ from: owner, value: amount });
    });

    it("owner can fetch payments by id", async () => {

      let payments = await this.contract.fetchPayment(1, { from: owner });

      assert.equal(payments[0], owner);
      assert.equal(payments[1], amount);
    });

    it("payment must exist", async () => {
      await truffleAssert.reverts(
        this.contract.fetchPayment(2, { from: owner }),
        'Undefined payment.'
      );
    });

    it("only owner can fetch payments", async () => {
      await truffleAssert.reverts(
        this.contract.fetchPayment(1, { from: user }),
        'Unauthorized sender.'
      );
    });

  });

  describe("Tests emptyBalance", () => {

  });
});