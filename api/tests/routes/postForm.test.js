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

  it("route rejects when data valid", done => {

    const validData = {
      "stringType":"asdfasdf",
      "stringLength":"1234556789",
      "numberType":1,
      "numberMax":10
    };

    request(server)
      .post("/postForm")
      .send(validData)
      .set('Accept', 'application/json')
      .expect(
        {
          healthy: true,
          process: "dev"
        }
      )
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("route resolves when data valid", done => {

    const validData = {
      "stringType":"asdfasdf",
      "stringLength":"1234556789",
      "numberType":1,
      "numberMax":11
    };

    request(server)
      .post("/postForm")
      .send()
      .expect(
        {
          healthy: true,
          process: "dev"
        },
      );
    done();
  });
});
