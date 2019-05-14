const request = require("supertest");

describe("Testing postForm route", () => {
  let server;

  // TODO find a way to make this re-usable
  beforeEach(done => {
    server = require("../../index");
    done();
  });

  afterEach(done => {
    server.close();
    done();
  });

  it("route rejects when data null", done => {
    request(server)
      .post("/postForm")
      .send(null)
      .set("Accept", "application/json")
      .expect({
        status: "Null validation errors:",
        errors:
          "stringType must exist, stringLength must exist, numberType must exist, numberMax must exist"
      });
    done();
  });

  it("route rejects when data types invalid", done => {
    const invalidData = {
      stringType: 1,
      stringLength: 1,
      numberType: "",
      numberMax: ""
    };

    request(server)
      .post("/postForm")
      .send(invalidData)
      .set("Accept", "application/json")
      .expect({
        status: "Data type validation errors:",
        errors:
          "stringType must be a string, stringLength must be a string, numberType must be a number, numberMax must be a number"
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("route rejects when business logic invalid", done => {
    const invalidData = {
      stringType: "",
      stringLength: "12345567",
      numberType: 1,
      numberMax: 9
    };

    request(server)
      .post("/postForm")
      .send(invalidData)
      .set("Accept", "application/json")
      .expect({
        status: "Business Logic validation errors:",
        errors:
          "stringLength length must be greater than 10, numberMax must be greater than 10"
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("route rejects when data valid", done => {
    const validData = {
      stringType: "asdfasdf",
      stringLength: "1234556789",
      numberType: 1,
      numberMax: 10
    };

    request(server)
      .post("/postForm")
      .send(validData)
      .set("Accept", "application/json")
      .expect({
        status: "postForm request validated!",
        result: "validated",
        formValues: {
          stringType: "asdfasdf",
          stringLength: "1234556789",
          numberType: 1,
          numberMax: 10
        }
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
