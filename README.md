# create-dapp

This product is decentralized product boilerplate, forked from [https://github.com/escobard/share](https://github.com/escobard/share).

## DAPP Usage

Production version available here: https://create-dapp.herokuapp.com/

Expanded instructions here: [documentation/usage.md](https://github.com/escobard/create-dapp/blob/master/documentation/usage.md)

### Docker

It's recommended to use `docker-compose` to quickly setup a local development environment.

The following `docker-compose` scripts are available: 

#### Development

`docker-compose -f dev.yaml up --build`

#### Testing

`docker-compose -f tests.yaml up --build`

#### Truffle Deploy

`docker-compose -f truffle-migrate.yaml up --build`

## Product Technology

A decentralized product boilerplate, forked from [https://github.com/escobard/share](https://github.com/escobard/share).

The product's functional logic can be summarized as an open checkings account, where anyone can send money to the account and view the transactions, but only the owner can withdraw funds.

Production version available here: https://create-dapp.herokuapp.com/

The software architecture for this product was designed with the following criteria in mind:

- Follow Object Oriented Practices to build re-usable and scalable functional components in all application layers.
- Adapt best syntax design, file structure and framework practices as a foundation for scalable organization.
- Utilize CircleCI to create re-usable, automated regression testing and deployment pipelines to Heroku.
- Use Docker Compose to run the UI, API, and Ganache Ethereum network in a single network to facilitate local development.
- Remain logically simple to serve as a boilerplate for future decentralized products.

Expanded product concept and highlights can be found here: [documentation/concept.md](https://github.com/escobard/create-dapp/blob/master/documentation/concept.md)

### UI

UI documentation can be found here: [ui/README.md](https://github.com/escobard/create-dapp/blob/master/ui/README.md)

### API 

API documentation can be found here: [api/README.md](https://github.com/escobard/create-dapp/blob/master/api/README.md)

### DevOps

DevOps documentation can be found here: [documentation/devops.md](https://github.com/escobard/create-dapp/blob/master/documentation/devops.md)

### Contribution

Contribution documentation can be found here: [documentation/contribution.md](https://github.com/escobard/create-dapp/blob/master/documentation/contribution.md)

## Libraries, Frameworks & Tools

[React](https://reactjs.org/)

[Redux](https://redux.js.org/)

[Node](https://nodejs.org/en/)

[Express](https://expressjs.com/)

[CircleCI](https://circleci.com/)

[Heroku](https://www.heroku.com/)

[Ethereum](https://www.ethereum.org/)

[Solidity Smart Contracts](https://github.com/ethereum/solidity)

[Truffle](https://truffleframework.com/)