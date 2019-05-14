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
  }
];

const environment =
  process.env.NODE_ENV === "production" ? "heroku" : "development";

console.log("environment", environment);

// TODO - to be updated with new heroku env for digipdfs
const apiRoot =
  environment === "heroku"
    ? "https://share-controller.herokuapp.com"
    : "http://localhost:4000";

console.log("root", apiRoot);

export const apiRoutes = {
  postForm: `${apiRoot + "/postForm"}`
};

export const headers = { "Access-Control-Allow-Origin": "*" };
