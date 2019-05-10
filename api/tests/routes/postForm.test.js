const request = require("supertest");

describe("Testing postForm route", () => {
  let server;

  // TODO find a way to make this re-usable
  beforeEach((done) => {
    server = require("../../index");
    done();
  });

  afterEach((done) => {
    server.close();
    done();
  });

  it("route passes data if when valid", done => {

    const validData = {
      "stringType":"",
      "stringLength":"1234556789",
      "numberType":1,
      "numberMax":10
    }

    request(server)
      .post("/postForm")
      .send(validData)
      .expect(
        {
          healthy: true,
          process: "dev"
        },
      );
    done();
  });
});
