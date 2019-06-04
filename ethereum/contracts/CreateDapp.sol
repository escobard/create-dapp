pragma solidity ^0.4.23;

contract Share {

    address private Owner;
    bool private initialized = false;
    uint private paymentID = 1;
    
    mapping(uint => Payment) public Payments;

    struct Payment {
        address user
        uint amount
    }

    constructor() public {
        Owner = msg.sender;
    }

    /// @notice handles metamask transaction coming from UI
    function makePayment() public payable {

        uint amount = msg.value;
        
        Payments[paymentID] = Payment(msg.sender, amount)

        paymentID = paymentID + 1;

        address(this).transfer(msg.value);
    }

    function fetchDonationID() public view returns (uint){

        // requires the owner to call this function, only owner address can access donationID atm
        require(ownerRole.isOwner(msg.sender));

        return donationID;
    }

    function fetchDonation(uint _donationID) public view returns (
        address owner,
        address lottery,
        address charity,
        address donor,
        uint amount,
        uint charityAmount,
        uint lotteryAmount,
        uint ownerAmount,
        uint id
    ){

        // requires the owner to call this function, only owner address can access donationID atm
        require(ownerRole.isOwner(msg.sender));

        owner = donationBase.getDonationOwner(msg.sender, _donationID);
        lottery = donationBase.getDonationLottery(msg.sender, _donationID);
        charity = donationBase.getDonationCharity(msg.sender, _donationID);
        donor = donationBase.getDonationDonor(msg.sender, _donationID);
        amount = donationBase.getDonationAmount(msg.sender, _donationID);
        charityAmount = donationBase.getDonationCharityAmount(msg.sender, _donationID);
        lotteryAmount = donationBase.getDonationLotteryAmount(msg.sender, _donationID);
        ownerAmount = donationBase.getDonationOwnerAmount(msg.sender, _donationID);
        id = donationBase.getDonationId(msg.sender, _donationID);

        return ( owner, lottery, charity, donor, amount, charityAmount, lotteryAmount, ownerAmount, id);
    }

    function isInitialized() public view returns(bool){
        require(ownerRole.isOwner(msg.sender));
        return initialized;
    }

    // need a function to pay out contract balance

}

