const request = require("supertest");

describe("Testing all routes", () => {
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

  it("responds to /health", done => {
    request(server)
      .get("/health")
      .expect(
        {
          healthy: true,
          process: "dev"
        },
      );
    done();
  });
});
