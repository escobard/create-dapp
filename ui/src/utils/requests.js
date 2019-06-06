import axios from "axios";
import { apiRoutes, headers } from "../constants";

const cleanError = error => {
  let errors;
  let status;
  let message;

  // checks for api validation error
  if (error.response) {
    errors = error.response.data.errors;
    status = error.response.data.status;
    message = `API rejection: ${status} ${errors}`;
    //console.log("makeDonation error response:",  error.response.data.errors);
  } else {
    message = `API rejection: ${error}`;
  }
  return message;
};

/** Sends POST request to API to postForm
 * @dev refer to the /postForm route within the API request handling logic
 * @name postForm
 * @returns resolved promise || rejected promise
 **/

export const postForm = async request => {
  return await axios
    .post(apiRoutes.postForm, request, { headers })
    .then(response => {
      return response;
    })
    .catch(error => {
      return cleanError(error);
    });
};
