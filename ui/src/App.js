import React, { Component } from "react";

import Navigation from "./components/Navigation";
import Form from "./components/Form";

import "./styles/global.scss";

import {
  makeDonationFields,
  postFormFields
} from "./constants";

import { postForm } from "./utils/requests";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    messageErrors: [],
    makeDonationTitle: "Make Donation form instructions",
    makeDonationMessage:
      "Enter a valid public key in the Address Public field, the public address' private key in the Private Key field, and an ether value smaller than 1 in the Amount field.",
    makeDonationStatus: null,
    postFormTitle: "Post Form",
    postFormMessage: "Follow the placeholder instructions to validate data on the UI and API side",
    postFormStatus: null
  };

  /** Submits the donation POST request to the API
   * @name makeDonation
   * @dev this requests triggers the timer, and checkStatus logic
   * @param {string} address_pu, contains public address form field value
   * @param {string} private_key, contains private address form field value
   * @param {string} amount, contains amount form field value
   * @returns /makeDonation route response, or validation errors
   **/

  makeDonation = async (address_pu, private_key, amount) => {
    let { messageErrors } = this.state;

    amount = parseFloat(amount);

    // triggers validation logic
    this.validateMakeDonation(address_pu, private_key, amount);

    // only runs request, if no validation errors are present
    if (messageErrors.length === 0) {

      const request = {
        address_pu: address_pu,
        address_pr: private_key,
        amount: amount
      }

      let response; // = await makeDonation(request);

      // checks for API promise rejections
      if(!response.status){
        return this.setState({
          makeDonationTitle: "makeDonation() error(s)",
          makeDonationMessage: response,
          makeDonationStatus: "red"
        });
      }
      else if(response.data.result === 'validated'){
        const { data: { status } } = response;

        this.setState({
          makeDonationTitle: "makeDonation() validated!",
          makeDonationMessage: status,
          makeDonationStatus: "green"
        });
      }
    }
  };

  /** Submits the POST request to the API
   * @name postForm
   * @dev this requests tests basic validation between UI and API
   * @param {string} stringType, contains random string value
   * @param {string} stringLength, contains random string value with a length greater than 10
   * @param {string} numberType, contains random string value
   * @param {string} numberMax, contains number greater than 10
   * @returns /postForm route response, or validation errors
   **/

  postForm = async (stringType, stringLength, numberType, numberMax) => {
    let { messageErrors } = this.state;

    // turns both strings into numbers
    numberType = parseInt(numberType);
    numberMax = parseInt(numberMax);

    // triggers validation logic
    this.validatePostForm(stringType, stringLength, numberType, numberMax);

    // only runs request, if no validation errors are present
    if (messageErrors.length === 0) {

      const request = {
        stringType,
        stringLength,
        numberType,
        numberMax
      };

      let response; // = await makeDonation(request);

      // checks for API promise rejections
      if(!response.status){
        return this.setState({
          makeDonationTitle: "postForm() error(s)",
          makeDonationMessage: response,
          makeDonationStatus: "red"
        });
      }
      else if(response.data.result === 'validated'){
        const { data: { status } } = response;

        this.setState({
          makeDonationTitle: "postForm() validated!",
          makeDonationMessage: status,
          makeDonationStatus: "green"
        });
      }
    }
  };

  /** Validates a form value
   * @dev can be split out into a validation class to re-use in api / ui layers
   * @param {*} value, property to validate
   * @param {*} condition, functional condition to validate / invalidate value
   * @param {string} error, string of error to add to this.state.errors
   **/

  validateField = (value, condition, error) => {
    if (condition) {
      this.setState({ messageErrors: this.state.messageErrors.push(error) });
    }
  };

  /** Resets the message array after form validation checks
   * @returns this.setState()
   **/

  emptyErrors = () => {
    this.setState({
      messageErrors: []
    });
  };

  /** Validates postForm values
   * @name validatePostForm
   * @dev used to reduce clutter in makeDonation
   * @param {string} stringType, contains random string value
   * @param {string} stringLength, contains random string value with a length greater than 10
   * @param {string} numberType, contains random string value
   * @param {string} numberMax, contains number greater than 10
   **/

  validatePostForm = (stringType, stringLength, numberType, numberMax) => {
    let { messageErrors } = this.state;

    this.validateField(
      stringType,
      stringType.length === 0,
      "String Type cannot be empty"
    );

    this.validateField(
      stringLength,
      stringLength.length < 10,
      "String Length must be greater than 10"
    );

    this.validateField(numberType, isNaN(numberType), "Number Type must be a number");
    this.validateField(numberMax, isNaN(numberMax), "Number Max must be a number");

    this.validateField(
      numberMax,
      numberMax < 10,
      "Number Max must be greater than 10"
    );

    // sets messagesState
    if (messageErrors.length > 0) {
      this.setState({
        postFormStatus: "red",
        postFormTitle: "postForm() error(s)",
        postFormMessage: `Contains the following error(s): ${messageErrors.join(", ")}.`
      });
      this.emptyErrors();
    } else {
      this.setState({
        postFormStatus: "green",
        postFormTitle: "postForm() validated",
        postFormMessage: `Making donation...`
      });
    }
  }


  /** Validates makeDonation form values
   * @name validateMakeDonation
   * @dev used to reduce clutter in makeDonation
   * @param {string} address_pu, contains public address form field value
   * @param {string} private_key, contains private address form field value
   * @param {string} amount, contains amount form field value
   **/

  validateMakeDonation = (address_pu, private_key, amount) => {
    let { messageErrors } = this.state;

    this.validateField(
      address_pu,
      address_pu.length !== 42,
      "Address Public must be valid public key"
    );

    this.validateField(
      private_key,
      private_key.length !== 64,
      " Address Private must be valid private key"
    );

    this.validateField(amount, isNaN(amount), " Amount must be a number");

    this.validateField(
      amount,
      amount > 1,
      " Amount cannot be more than 1 ether"
    );

    // sets messagesState
    if (messageErrors.length > 0) {
      this.setState({
        makeDonationStatus: "red",
        makeDonationTitle: "makeDonation() error(s)",
        makeDonationMessage: `Contains the following error(s): ${messageErrors.join()}.`
      });
      this.emptyErrors();
    } else {
      this.setState({
        makeDonationStatus: "green",
        makeDonationTitle: "makeDonation() validated",
        makeDonationMessage: `Making donation...`
      });
    }
  };

  render() {
    let {
      makeDonationTitle,
      makeDonationMessage,
      makeDonationStatus,
      postFormTitle,
      postFormMessage,
      postFormStatus,
      postFormResult
    } = this.state;

    return (
      <main className="application">
        <Navigation />
        <section className="float">
          <Form
            makeDonation={this.makeDonation}
            fields={makeDonationFields}
            messageHeader={makeDonationTitle}
            messageValue={makeDonationMessage}
            messageStatus={makeDonationStatus}
          />
        </section>

        <section className="float">
          <Form
            postForm={this.postForm}
            fields={postFormFields}
            messageHeader={postFormTitle}
            messageValue={postFormMessage}
            messageStatus={postFormStatus}
          />
        </section>

        <Footer/>
      </main>
    );
  }
}

export default App;
