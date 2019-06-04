pragma solidity ^0.5.0;

contract CreateDapp {

    address private Owner;
    address private Contract;

    // necessary conversion with solidity 0.5.0 to use address.transfer()
    // more here: https://ethereum.stackexchange.com/questions/66486/type-address-is-not-implicitly-convertible-to-expected-type-address-payable?noredirect=1&lq=1
    address payable PayContract;
    bool private initialized = false;
    uint private paymentID = 1;
    
    mapping(uint => Payment) public Payments;

    struct Payment {
        address user;
        uint amount;
    }

    constructor() public {
        Owner = msg.sender;
        Contract = address(this);
        PayContract = address(uint160(Contract));
    }

    function makePayment() public payable {

        uint amount = msg.value;
        
        Payments[paymentID] = Payment(msg.sender, amount);

        paymentID = paymentID + 1;
        
        PayContract.transfer(msg.value);
    }

    function emptyBalance() public payable {

        require(msg.sender == Owner, "Unauthorized address!");

        Owner.transfer(address(this).balance);
    }

}

