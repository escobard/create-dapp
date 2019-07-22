# create-dapp

A decentralized product boilerplate using javascript.

Documentation has been fragmented into several different markdown files, to facilitate collaboration.

## Product Technology

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

Expanded product concept and highlights can be found here: [documentation/concept.md](https://github.com/escobard/create-dapp/blob/master/documentation/concept.md)

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

### UI

UI NPM usage doc can be found here: [ui/README.md](https://github.com/escobard/create-dapp/blob/master/ui/README.md)

### API 

API documentation can be found here: [documentation/api.md](https://github.com/escobard/create-dapp/blob/master/documentation/api.md)

API local usage doc can be found here: [api/README.md](https://github.com/escobard/create-dapp/blob/master/api/README.md)

### Devops

Devops documentation can be found here: [documentation/devops.md](https://github.com/escobard/create-dapp/blob/master/documentation/devops.md)

### Contribution

Contribution documentation can be found here: [documentation/contribution.md](https://github.com/escobard/create-dapp/blob/master/documentation/contribution.md)

## Libraries, Frameworks & Tools

[React](https://reactjs.org/)

[Redux](https://redux.js.org/)

[Node](https://nodejs.org/en/)

[Express](https://expressjs.com/)

[Heroku](https://www.heroku.com/)

