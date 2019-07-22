# create-dapp

This product was intentionally designed to be as bare-bones as possible to allow for future reusability.

The smart contract functionality can be thought of as an open checkings account, where anyone can send money to the account and view the transactions, but only the owner can withdraw funds.

To showcase the smart contract interaction through a simple UI, 2 base functions were created:

1) `makePayment()` - makes a payment to the smart contract
2) `fetchPayment()` - fetches payment data from the smart contract

A third `emptyBalance()` function can be accessed by the owner of the smart contract, which sends the entire contract balance to the owner. 

Production version available here: https://create-dapp.herokuapp.com/

This product builds upon the traditional MVC (Model View Controller) paradigm where:
   - The Model = the Truffle ethereum layer - is handled in the `/ethereum` directory.
   - The View = the React user interface - is handled in the `/ui` directory.
   - The Controller = the Node restful api  - handled in the `/api` directory.

Furthermore, the following frameworks were chosen to rapidly deliver a production ready decentralized product:

1) Heroku for automatic deployment / hosting of the UI / API layers.
2) CircleCI for continuous integration and deployment.
2) Github for source control and Github Projects for scrum.
2) `react` for the User Interface using the `create-react-app` library.
3) `node` with `express` for the restful API.
5) `solidity` smart contracts managed by `truffle` to interact with the Ethereum protocol.
6) Ethereum to manage transactions, currency and data persistence.

## Product highlights

1) UI:
    - `sass` styled UI, including utilization of mixins, variables, global vs component level styles.
    - Form level data type, length, and business validation
    - Re-usable component best practices
    - React only state usage without the need for redux.
    - semantic-ui-react for re-usable components.
    - responsive UI.
    - jest snapshot testing.
    - production ready bundling with create-react-app.
2) API: 
    - manages all public user-to-contract logic.
    - raw transaction handling with ethereum.
    - public, private, public / private pair, null, data type, value, business validation.
    - re-usable middlewares
    - testing with supertest
4) Truffle:
    - automatic deployment to Rinkeby and Ganache of all contracts.
    - smart contract business logic testing.
    - dynamic setting of ganache-cli running server with docker
5) Docker & Docker Compose:
    - continous development of both UI & API.
    - test scripts for UI / API / Ethereum for both circleci and local testing.
    - automated deployment with Truffle to Ganache for smart contract development.
    - production network using docker-compose.
6) DevOps:
    - continuous integration with CircleCI.
    - continuous deployment to Heroku.
7) Scrum:
    - Github to track issues, and task progress.
    - Github Projects as the scrum board.