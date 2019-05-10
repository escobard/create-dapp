# create-dapp

An npm package to fo generate full stack product boilerplates

## Product Technology

This product follows the traditional MVC (Model View Controller) paradigm where:
   - The Model = the postgre db (or mongo, should deicde) - is handled in the `/database` directory
   - The View = the React user interface - is handled in the `/ui` directory
   - The Controller = the Node restful api  - handled in the `/api` directory

Furthermore, the following stack was chosen to rapidly deliver a production ready decentralized product:

1) Heroku for automatic deployment / hosting of the UI / API layers.
2) CircleCI for continuous integration and deployment.
2) Github for source control and Github Projects for scrum.
2) React for the UI with `create-react-app`.
3) Node with Express for the restful API.
5) Sequilize to handle DB logic.

Expanded product concept and highlights can be found here: [documentation/concept.md](https://github.com/escobard/share/blob/master/documentation/concept.md)

## Documentation

Documentation has been fragmented into several different markdown files, to facilitate collaboration.

### APP Usage

Production version available here: https://share-ui.herokuapp.com/

Follow the instructions within the messages to utilize, expanded instructions here: [documentation/usage.md](https://github.com/escobard/share/blob/master/documentation/usage.md)

### UI

UI documentation can be found here: [documentation/ui.md](https://github.com/escobard/share/blob/master/documentation/ui.md)

UI local usage doc can be found here: [ui/README.md](https://github.com/escobard/share/blob/master/ui/README.md)

### API 

API documentation can be found here: [documentation/api.md](https://github.com/escobard/share/blob/master/documentation/api.md)

API local usage doc can be found here: [api/README.md](https://github.com/escobard/share/blob/master/api/README.md)

### Devops

Devops documentation can be found here: [documentation/devops.md](https://github.com/escobard/share/blob/master/documentation/devops.md)

### Contribution

Contribution documentation can be found here: [documentation/contribution.md](https://github.com/escobard/share/blob/master/documentation/contribution.md)

## Libraries, Frameworks & Tools

[React](https://reactjs.org/)

[Redux](https://redux.js.org/)

[Node](https://nodejs.org/en/)

[Express](https://expressjs.com/)

[Heroku](https://www.heroku.com/)

