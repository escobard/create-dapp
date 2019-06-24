const request = require("supertest");

describe("Testing health route", () => {
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

  it("responds to /health", done => {
    request(server)
      .get("/health")
      .expect({
        healthy: true,
        ethereum: "https://rinkeby.infura.io/v3/a07ed258a1924109a285a22a3778d0bb"
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
