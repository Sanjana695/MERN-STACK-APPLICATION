const app = require("../index");
const userController = require("../Controllers/userController");
const request = require("supertest");

describe("POST API", () => {
  test("It should post a user", async () => {
    let user = {
      username: "sanjnaww",
      password: "123",
      email: "sanjna@gmail.com",
    };

    const response = await request(app).post("/signup").send(user);
    expect(response.error).toBe(false);
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe("sanjna");
  });
});
