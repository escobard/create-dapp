import React, { Component } from "react";

import Navigation from "./components/Navigation";
import Form from "./components/Form";
import DonationTable from "./components/DonationTable";

import "./styles/global.scss";

import {
  makeDonationFields,
  fetchDonationFields,
} from "./constants";

import {fetchPayment, makePayment, makePaymentStatus} from "./utils/requests";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    messageErrors: [],
    makeDonationTitle: "Make Donation form instructions",
    makeDonationMessage:
      "Enter a valid public key in the Address Public field, the public address' private key in the Private Key field, and an ether value smaller than 1 in the Amount field.",
    makePaymentStatus: null,
    fetchDonationTitle: "Fetch Donation form instructions",
    fetchDonationMessage:
      "Enter a valid donor public key in the Address Public field and a valid currentPayment in the currentPayment field.",
    fetchDonationStatus: null,
    currentPayment: false,
    donorAddress: false,
    fetchedDonation: false,
    formMessage: "",
    time: 0,
    isOn: false,
    start: 0
  };

  /** Triggers logic to start the timer
   * @name startTimer
   * @dev every second checkStatus request is triggered, to check donationStatus from API
   **/

  startTimer = async () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });

    this.timer = setInterval(async () => await this.checkStatus(), 1000);
  };

  /** Triggers logic to stop the timer
   * @name stopTimer
   **/

  stopTimer = () => {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  };

  /** Triggers logic to stop the timer
   * @name resetTimer
   **/

  resetTimer = () => {
    this.setState({ time: 0, isOn: false });
  };

  /** Sends GET request to API to check donationStatus
   * @name checkStatus
   * @dev refer to the /makePaymentStatus route within the API request handling logic
   * @returns this.resetTimer || this.setState || err
   **/

  checkStatus = async () => {
    let response = await makePaymentStatus();
    console.log('PAYMENT STATUS', response)
    // ends the timer if donation has been created.
    if (response.data.result === "created") {
      this.stopTimer();

      let {
        data: { result, status, currentPayment }
      } = response;

      this.setState({
        donationStatus: result,
        currentPayment: currentPayment,
        makeDonationTitle: "makePayment() success",
        makeDonationMessage:
          `Time spent creating donation: ${this.state.time} seconds. ` + status,
        makePaymentStatus: "green"
      });
      return this.resetTimer();
    } else {
      return this.setState({
        time: this.state.time + 1,
        donationStatus: response.data.result,
        makeDonationTitle: "makePayment() started",
        makeDonationMessage:
          "Donation Validated! " +
          `Time spent creating donation: ${this.state.time} seconds. `,
        makePaymentStatus: "blue"
      });
    }
  };

  /** Submits the donation POST request to the API
   * @name makePayment
   * @dev this requests triggers the timer, and checkStatus logic
   * @param {string} user_pa, contains public address form field value
   * @param {string} private_key, contains private address form field value
   * @param {string} amount, contains amount form field value
   * @returns /makePayment route response, or validation errors
   **/

  makePayment = async (user_pa, private_key, amount) => {
    let { messageErrors } = this.state;

    amount = parseFloat(amount);

    // triggers validation logic
    this.validateMakeDonation(user_pa, private_key, amount);

    // only runs request, if no validation errors are present
    if (messageErrors.length === 0) {

      const request = {
        user_pa: user_pa,
        user_pk: private_key,
        amount: amount
      }

      let response = await makePayment(request);
      console.log('RESPONSE', response)
      // checks for API promise rejections
      if(!response.status){
        return this.setState({
          makeDonationTitle: "makePayment() error(s)",
          makeDonationMessage: response,
          makePaymentStatus: "red"
        });
      }
      else if(response.data.result === 'validated'){
        const { data: { status } } = response;

        this.setState({
          donorAddress: user_pa,
          makeDonationTitle: "makePayment() started",
          makeDonationMessage: status,
          makePaymentStatus: "blue"
        });

        // starts logic to check for donationStatus
        return this.startTimer();
      }
    }
  };

  /** Submits the fetch donation POST request to the API
   * @devs this function returns the fetched donation object from ethereum, via the API
   * @param {string} user_pa, contains public address form field value
   * @param {string} currentPayment, contains amount form field value
   * @returns /fetchPayment route response, or validation errors
   **/

  fetchPayment = async (user_pa, currentPayment) => {
    let { messageErrors } = this.state;

    currentPayment = parseInt(currentPayment);

    this.validateFetchDonation(user_pa, currentPayment);

    if (messageErrors.length === 0) {

      const request = { user_pa: user_pa, id: currentPayment };

      let response = await fetchPayment(request);

      // checks for API promise rejections
      if (!response.status){
        return this.setState({
          fetchDonationTitle: "fetchPayment error(s)",
          fetchDonationMessage: response,
          fetchDonationStatus: "red"
        });
      }
      else if(response.data.result === "fetched"){
        const { data: { donation } } = response;

        // donation object from ethereum is turned into an array to work with react
        let donationArray = Object.keys(donation).map(key => {
          return [key, donation[key]];
        });

        return this.setState({
          fetchedDonation: donationArray,
          fetchDonationTitle: "fetchPayment() success",
          fetchDonationMessage: `Donation ${donation.id} fetched, find your donation data below.`,
          fetchDonationStatus: "green"
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

  /** Validates makePayment form values
   * @name validateMakeDonation
   * @dev used to reduce clutter in makePayment
   * @param {string} user_pa, contains public address form field value
   * @param {string} private_key, contains private address form field value
   * @param {string} amount, contains amount form field value
   **/

  validateMakeDonation = (user_pa, private_key, amount) => {
    let { messageErrors } = this.state;

    this.validateField(
      user_pa,
      user_pa.length !== 42,
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
        makePaymentStatus: "red",
        makeDonationTitle: "makePayment() error(s)",
        makeDonationMessage: `Contains the following error(s): ${messageErrors.join()}.`
      });
      this.emptyErrors();
    } else {
      this.setState({
        makePaymentStatus: "green",
        makeDonationTitle: "makePayment() validated",
        makeDonationMessage: `Making donation...`
      });
    }
  };

  /** Validates validateFetchDonation form values
   * @name validateFetchDonation
   * @dev used to reduce clutter in makePayment
   * @param {string} user_pa, contains public address form field value
   * @param {string} currentPayment, contains amount form field value
   **/

  validateFetchDonation = (user_pa, currentPayment) => {
    let { messageErrors } = this.state;

    this.validateField(
      user_pa,
      user_pa.length !== 42,
      "Address Public must be valid public key"
    );

    this.validateField(
      currentPayment,
      isNaN(currentPayment),
      " Amount must be a number"
    );

    if (messageErrors.length > 0) {
      this.setState({
        fetchDonationStatus: "red",
        fetchDonationTitle: "fetchPayment() error(s)",
        fetchDonationMessage: `Contains the following error(s): ${messageErrors.join()}.`
      });
      this.emptyErrors();
      return;
    } else {
      this.setState({
        fetchDonationStatus: "blue",
        fetchDonationTitle: "fetchPayment() started",
        fetchDonationMessage: `Fetching donation...`
      });
    }
  };

  render() {
    let {
      makeDonationTitle,
      makeDonationMessage,
      makePaymentStatus,
      fetchDonationTitle,
      fetchDonationMessage,
      fetchDonationStatus,
      fetchedDonation
    } = this.state;

    return (
      <main className="application">
        <Navigation />
        <section className="float">
          <Form
            makePayment={this.makePayment}
            fields={makeDonationFields}
            messageHeader={makeDonationTitle}
            messageValue={makeDonationMessage}
            messageStatus={makePaymentStatus}
            setMessage={this.setMessage}
          />
        </section>

        <section className="float">
          <Form
            fetchPayment={this.fetchPayment}
            fields={fetchDonationFields}
            messageHeader={fetchDonationTitle}
            messageValue={fetchDonationMessage}
            messageStatus={fetchDonationStatus}
            setMessage={this.setMessage}
          />
        </section>

        {fetchedDonation ? (
          <section className="float">
            <DonationTable donationData={fetchedDonation} />
          </section>
        ) : null}

        <Footer/>
      </main>
    );
  }
}

export default App;
