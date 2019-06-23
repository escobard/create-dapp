pragma solidity ^0.5.0;

contract CreateDapp {

    address public Owner;
    address private Contract;

    // necessary conversion with solidity 0.5.0 to use address.transfer()
    // more here: https://ethereum.stackexchange.com/questions/66486/type-address-is-not-implicitly-convertible-to-expected-type-address-payable?noredirect=1&lq=1

    address payable PayContract;
    address payable PayOwner;
    bool private initialized = false;
    uint public paymentID = 1;
    
    mapping(uint => Payment) public Payments;

    struct Payment {
        address user;
        uint amount;
    }

    constructor() public {
        Owner = msg.sender;
        Contract = address(this);
        PayContract = address(uint160(Contract));
        PayOwner = address(uint160(Owner));
    }

    function makePayment() public payable {

        uint amount = msg.value;

        Payments[paymentID] = Payment(msg.sender, amount);

        paymentID = paymentID + 1;

        PayContract.send(msg.value);
    }

    function fetchPayment(uint _paymentID) public view returns (
        address user,
        uint amount
    ){
        require(_paymentID <= paymentID - 1, 'Undefined payment.');

        require(Payments[_paymentID].user == msg.sender, 'Unauthorized user.');

        return ( Payments[_paymentID].user, Payments[_paymentID].amount );
    }

    function emptyBalance() public payable {

        require(msg.sender == Owner, "Unauthorized sender.");

        PayOwner.transfer(address(this).balance);
    }

}

