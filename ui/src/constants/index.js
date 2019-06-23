export const makePaymentFields = [
  {
    name: "addressPub",
    label: "Address Public",
    placeholder: "Donor's public address",
    value: "",
    error: false
  },
  {
    name: "privKey",
    label: "Private Key",
    placeholder:
      "Donor's private address - only used to SIGN raw transactions within API, not stored or cached",
    value: "",
    error: false
  },
  {
    name: "amount",
    label: "Amount",
    placeholder: "Donation amount in ether",
    value: "",
    error: false
  }
];

export const fetchedPaymentFields = [
  {
    name: "address",
    label: "Address Public",
    placeholder: "Enter user's public address",
    value: "",
    error: false
  },
  {
    name: "id",
    label: "Donation ID",
    placeholder: "Enter the Donation ID",
    value: "",
    error: false
  }
];

// TODO - too much going on here, split all of the logic into util functions, import to this file, export constants from /constants/routes.js

let environment =
  process.env.NODE_ENV === "production" ? "heroku" : "development";

// TODO - to be updated with new heroku env for digipdfs
let apiRoot =
  environment === "heroku"
    ? "https://share-controller.herokuapp.com"
    : "http://localhost:4000";

apiRoot = process.env.DOCKER === "dev" ? "http://localhost:1117" : apiRoot;
apiRoot = process.env.DOCKER === "prod" ? "compute-engine-url" : apiRoot;

const ganache = process.env.NODE_ENV !== 'test' && process.env.DOCKER ? require("../ethereum/config.json") : null;

console.log(ganache)

export const apiRoutes = {
  makePayment: `${apiRoot + "/makePayment"}`,
  fetchPayment: `${apiRoot + "/fetchPayment"}`,
  makePaymentStatus: `${apiRoot + "/makePaymentStatus"}`,
};

export const headers = { "Access-Control-Allow-Origin": "*" };
