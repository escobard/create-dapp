const request = require("supertest");

describe("Testing postForm route", () => {
  let server;
  global.nodePort = 5000;

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
