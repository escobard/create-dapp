pragma solidity ^0.4.23;

contract Share {

    address private Owner;
    bool private initialized = false;

    // assigns an ID to each payment
    uint private paymentID = 1;

    /// @notice sets the owner to the Owner variable upon contract init
    /// @dev can be expanded to account for many more constructor features
    constructor() public {
        Owner = msg.sender;
    }

    // TODO - this logic must also include the new contract
    function initiateContract(address _lottery, address _charity) public payable{

        require(initialized == false, "Contract already initialized!");
        require(Owner == msg.sender, "Invalid sender!");
        initialized = true;
    }

    /// @notice parent function for all contract functionality
    /// @dev Should consider splitting this out further if necessary by reviewers

    function makeDonation() public payable{
        // owner, charity, and lottery accounts cannot utilize the handleFunds function
        require(initialized == true && !ownerRole.isOwner(msg.sender) && !charityRole.isCharity() && !lotteryRole.isLottery());

        donorRole.setDonor(msg.sender, Owner);
        address Donor = donorRole.getDonor(Owner);

        donationBase.setReceived(Owner, Lottery, Charity, Donor, donationID);

        uint amount = msg.value;
        uint charityAmount = amount * 95 / 100;
        uint lotteryAmount = amount * 4 / 100;
        uint ownerAmount = amount * 1 / 100;

        donationBase.setProcessed(Owner, amount, donationID);

        // TODO - these can be refactored to ownerRole, since it utilizes the transfer of ownership principle
        Charity.transfer(charityAmount);

        donationBase.setSentToCharity(Owner, charityAmount, donationID);

        Lottery.transfer(lotteryAmount);

        donationBase.setSentToLottery(Owner, lotteryAmount, donationID);

        // dispatches remaining funds to owner, this ensures that all gas is covered
        Owner.transfer(ownerAmount);

        donationBase.setSentToOwner(Owner, ownerAmount, donationID);


        // add lotteryEntrees struct
        donationBase.setLottery(Owner, Donor, donationID);

        // TODO - figure out why state updates are not updating donationID, pointless extra memory usage by setting donation twice
        donationBase.setDonation(
            Owner,
            Lottery,
            Charity,
            Donor,
            amount,
            charityAmount,
            lotteryAmount,
            ownerAmount,
            donationID
        );

        donationBase.setStored(Owner, donationID);

        // updates donationID;
        donationID = donationID + 1;
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

}

