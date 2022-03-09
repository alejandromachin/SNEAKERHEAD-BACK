require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectToDataBase = require("../../database");
const { app } = require("..");
const User = require("../../database/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await User.create({
    name: "Alejandro",
    username: "machinazo",
    password: "12345",
    email: "test@test.com",
    city: "testland",
    admin: false,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /user/register endpoint", () => {
  describe("When it receives a POST request with a username already taken", () => {
    test("Then it should response with an error 409", async () => {
      const endpoint = "/user/register";
      const user = {
        name: "Alejandro Test",
        username: "machinazo",
        password: "12345",
        email: "test@test.com",
        city: "testland",
        admin: false,
      };

      const { body } = await request(app).post(endpoint).send(user).expect(409);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with a username not taken", () => {
    test("Then it should response with the user created and a status code 200", async () => {
      const endpoint = "/user/register";
      const user = {
        name: "Alejandro Test",
        username: "machinazo2",
        password: "12345",
        email: "test@test.com",
        city: "testland",
        admin: false,
      };

      const { body } = await request(app).post(endpoint).send(user).expect(200);

      expect(body).toHaveProperty("username", "machinazo2");
    });
  });
});
