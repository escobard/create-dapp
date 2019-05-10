const request = require("supertest");

// TODO - base tests for API to be updated for all Share routes
describe("Testing all routes", () => {
  let server;

  beforeEach((done) => {
    server = require("../../index");
    done();
  });

  afterEach((done) => {
    server.close();
    done();
  });
  
  it("404 everything else", done => {
    request(server)
      .get("/foo/bar")
      .expect(404, done());
  });
});
