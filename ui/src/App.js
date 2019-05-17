import React, { Component } from "react";

import Navigation from "./components/Navigation";
import Form from "./components/Form";
import Footer from "./components/Footer";

import { postFormFields } from "./constants";
import { postForm } from "./utils/requests";

import "./styles/global.scss";

class App extends Component {

  state = {
    messageErrors: [],
    postFormTitle: "Post Form",
    postFormMessage:
      "Follow the placeholder instructions to validate data on the UI and API side",
    postFormStatus: null
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

      let response = await postForm(request);

      // checks for API promise rejections
      if (!response.status) {
        return this.setState({
          postFormTitle: "postForm() error(s)",
          postFormMessage: response,
          postFormStatus: "red"
        });
      } else if (response.data.result === "validated") {
        const {
          data: { status }
        } = response;

        this.setState({
          postFormTitle: "postForm() validated!",
          postFormMessage: status,
          postFormStatus: "green"
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

    this.validateField(
      numberType,
      isNaN(numberType),
      "Number Type must be a number"
    );
    this.validateField(
      numberMax,
      isNaN(numberMax),
      "Number Max must be a number"
    );

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
        postFormMessage: `Contains the following error(s): ${messageErrors.join(
          ", "
        )}.`
      });
      this.emptyErrors();
    } else {
      this.setState({
        postFormStatus: "green",
        postFormTitle: "postForm() validated",
        postFormMessage: `Making donation...`
      });
    }
  };

  render() {
    let {
      postFormTitle,
      postFormMessage,
      postFormStatus
    } = this.state;

    return (
      <main className="application">
        <Navigation />
        <h1>TasdsEssST</h1>
        <section className="float">
          <Form
            postForm={this.postForm}
            fields={postFormFields}
            messageHeader={postFormTitle}
            messageValue={postFormMessage}
            messageStatus={postFormStatus}
          />
        </section>

        <Footer />
      </main>
    );
  }
}

export default App;
