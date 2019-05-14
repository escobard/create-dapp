export const makeDonationFields = [
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

export const fetchDonationFields = [
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

export const postFormFields = [
  {
    name: "stringType",
    label: "String Type",
    placeholder: "Enter a random string",
    value: "",
    error: false
  },
  {
    name: "stringLength",
    label: "String Length",
    placeholder: "Enter a random string, must have char length greater than 10",
    value: "",
    error: false
  },
  {
    name: "numberType",
    label: "Number Type",
    placeholder: "Enter a random number, must have char length greater than 10",
    value: "",
    error: false
  },
  {
    name: "numberMax",
    label: "Number Max",
    placeholder: "Enter a random number, must be greater than 10",
    value: "",
    error: false
  },
];


const environment =
  process.env.NODE_ENV === "production" ? "heroku" : "development";

console.log('environment', environment);

// TODO - to be updated with new heroku env for digipdfs
const apiRoot = environment === "heroku" ? "https://share-controller.herokuapp.com" : "http://localhost:4000";

console.log('root', apiRoot)

export const apiRoutes = {
  makeDonation: `${apiRoot + "/postForm"}`
};

export const headers = { "Access-Control-Allow-Origin": "*" };