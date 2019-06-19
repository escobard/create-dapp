const cors = require("cors");

const setOrigin = (app) =>{
  // TODO this needs to be refactored to a helper - needs to handle GCP logic after containerization
  if (process.env.NODE_ENV === "production"){
    global.environment = "prod";
    app.use(cors({ origin: "https://share-ui.herokuapp.com" }));
  }
  else{
    app.use(cors({ origin: "http://localhost:1337" }));
    global.environment = "dev";
  }
};

module.exports = { setOrigin };