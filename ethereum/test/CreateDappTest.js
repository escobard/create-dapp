

// this grabs the CreateDapp.sol file within /contracts
const CreateDapp = artifacts.require("./CreateDapp.sol");

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
});
  /*
  describe("Tests makeDonation()", () => {
    it("donor can create donation, checks donation iteration", async () => {
      await this.contract.makeDonation({ from: donor, value: amount });
      let response = await this.contract.fetchDonationID();

      assert.equal(response, 2);
    });

    /*
        // only charity needs to be tested, can add cases for
        it("charity cannot create donation", async () =>{
            let response = await this.contract.makeDonation({from: charity, value: amount});

            assert.equal(response, undefined);
        })

  });

  describe("Tests fetchDonation()", () => {
    // initializes contract every time prior to makeDonation();

    let charityAmount = amount * 0.95,
      lotteryAmount = amount * 0.04,
      ownerAmount = amount * 0.01;

    beforeEach(async () => {
      await this.contract.initiateContract(lottery, charity, { from: owner });
    });

    it("donor can fetch donation by donationID", async () => {
      await this.contract.makeDonation({ from: donor, value: amount });
      let fetchedDonation = await this.contract.fetchDonation(1, {
        from: owner
      });
      console.log(fetchedDonation);

      // need to assert each output, due to how number amounts are returned from solidity
      assert.equal(fetchedDonation[0], owner);
      assert.equal(fetchedDonation[1], lottery);
      assert.equal(fetchedDonation[2], charity);
      assert.equal(fetchedDonation[3], donor);
      assert.equal(fetchedDonation[4], amount);
      assert.equal(fetchedDonation[5], charityAmount);
      assert.equal(fetchedDonation[6], lotteryAmount);
      assert.equal(fetchedDonation[7], ownerAmount);
      assert.equal(fetchedDonation[8], 1);
    });
  });
});
        */