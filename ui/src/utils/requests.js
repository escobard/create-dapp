import axios from "axios";
import { apiRoutes, headers } from "../constants";

/** Sends GET request to API to check donationStatus
 * @dev refer to the /makeDonationStatus route within the API request handling logic
 * @name makeDonationStatus
 * @returns resolved promise || rejected promise
 **/

export const makeDonationStatus = async () => {
  try {
    return await axios.get(apiRoutes.makeDonationStatus, { headers });
  } catch (error) {
    return cleanError(error);
  }
};

/** Cleans up API / promise rejection errors for UI error display
 * @dev helper util created to avoid catch clutter
 * @name cleanError
 * @return string
 **/

const cleanError = error => {
  let errors;
  let status;
  let message;

  // checks for api validation error
  if (error.response) {
    errors = error.response.data.errors;
    status = error.response.data.status;
    message = `API rejection: ${status} ${errors}`;
    //console.log("makePayment error response:",  error.response.data.errors);
  } else {
    message = `API rejection: ${error}`;
  }
  return message;
};

/** Sends POST request to API to makePayment
 * @dev refer to the /makePayment route within the API request handling logic
 * @name makePayment
 * @returns resolved promise || rejected promise
 **/

export const makePayment = async request => {
  return await axios
    .post(apiRoutes.makePayment, request, { headers })
    .then(response => {
      return response;
    })
    .catch(error => {
      return cleanError(error);
    });
};

/** Sends POST request to API to fetchPayment
 * @dev refer to the /fetchPayment route within the API request handling logic
 * @name fetchPayment
 * @returns resolved promise || rejected promise
 **/

export const fetchPayment = async request => {
  return await axios
    .post(apiRoutes.fetchPayment, request, { headers })
    .then(response => {
      return response;
    })
    .catch(error => {
      return cleanError(error);
    });
};
