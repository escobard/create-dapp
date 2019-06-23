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
        ethereum: "https://rinkeby.infura.io/v3/47c181283cb345c19697f9403531914c",
        contract: "0x3b933FE5445988945FfFB478a55Ab41d129c02D0"
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
