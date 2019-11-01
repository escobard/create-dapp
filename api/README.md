# API

## Usage

### Local development

`npm run dev`

### Local testing

`npm test`

### Production

`npm start`

## Validation

Validation of each route currently checks for:

1) null values
1) data types
1) valid public address hash
1) valid public / private pair

## Routes

There are currently three routes in the application.

### Make Payment - POST

This route handles the validation of all the data necessary to make a payment. Once data has been validated, the `/makePaymenttatus` route becomes accessible. 

Accepted request body:

```angular2html

{
 "user_pa":"0xe71a0829E03c6e26fc5486c8d10e0bf0C1A92cF9",
 "user_pk":"EBDB03D10DC7131D24D8A7154839937352A11AB43CC9EFC11EE9747DA562BD72", 
 "amount":"0.1"
}

```

If all validations pass, a sample response is: 

```angular2html
{"status":"payment Validated! Sending to Smart Contract...","result":"validated"}
```

### Make Payment Status - GET

This route returns the payment success / failure response and is triggered by a validated request from the `/makePayment` route.

No payment active response:

```
{
    "status":"No donation request active.",
    errors: "No donation request active, make a donation first."
}
```

Payment sent:

```
{
    "status":"Payment Validated! Sending to Smart Contract...",
    "result":"validated"
}
```

Payment error:

```
{
    "status":"No donation request active.",
    errors: "Payment Error"
}
```

Payment created:

```
{
    "status":"Payment 2 created!",
    "result":"created",
    "currentPayment":2
}
```


#### Fetch Payment - POST

Accepted request body:

```angular2html

{
    "address":"0x38a3A60D25825D5B699c7756285b805d0A1f3b01",
    "id": 17
}

```

If all validations pass, a sample response is: 

```angular2html
{
    status: 'Payment fetched!',
    result: 'fetched',
    payment: {
        user: '0x55c8803151c2a54556117a72d939f8334Edc0DEb',
        amount: '0.01',
        id: 2
    }
}
```