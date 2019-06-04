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

    function makePayment() public payable {

        uint amount = msg.value;
        
        Payments[paymentID] = Payment(msg.sender, amount)

        paymentID = paymentID + 1;

        address(this).transfer(msg.value);
    }

    function emptyBalance() public payable {

        require(msg.sender == Owner, "Unauthorized address!");

        Owner.transfer(address(this).balance)
    }

}

