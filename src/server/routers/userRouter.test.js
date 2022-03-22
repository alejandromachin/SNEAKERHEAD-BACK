require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectToDataBase = require("../../database");
const { app } = require("..");
const User = require("../../database/models/User");
const Ad = require("../../database/models/Ad");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await User.create({
    _id: "623359fc14fef71610125a52",
    name: "Alejandro",
    lastname: "Rodriguez",
    username: "machinazo",
    password: "$2b$10$YWgU3XTyRRilXcc8uqOpNOTNu1tCzRJKrEyjrajSZJJvcutglPWXO",
    email: "test@test.com",
    city: "testland",
    ads: ["6231ce8edb40ac7b958d137c"],
    admin: false,
  });

  await Ad.create({
    _id: "6231ce8edb40ac7b958d137c",
    brand: "Jordan",
    style: "1 high",
    colorway: "Chicago",
    image1: "image",
    image2: "image",
    image3: "image",
    image4: "image",
    size: 40,
    likes: 0,
    price: "4.000€",
    status: "new",
    box: "no box",
    condition: 10,
    ownerEmail: "test@email.com",
  });
});

afterEach(async () => {
  await User.deleteMany({});
  await Ad.deleteMany({});
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
        lastname: "Rodriguez Test",
        username: "machinazo",
        password: "12345",
        email: "test@test.com",
        city: "testland",
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
        lastname: "Rodriguez Test",
        username: "machinazo2",
        password: "12345",
        email: "test@test.com",
        city: "testland",
      };

      const { body } = await request(app).post(endpoint).send(user).expect(200);

      expect(body).toHaveProperty("username", "machinazo2");
    });
  });
});
describe("Given /login/ endpoint", () => {
  describe("When it receives a POST request and a wrong user", () => {
    test("then it should response with a error and the status code 403 ", async () => {
      const user = { username: "wrong" };
      const endpoint = "/user/login";

      const { body } = await request(app).post(endpoint).send(user).expect(403);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with the right user and a wrong password", () => {
    test("then it should response with a error and the status code 403 ", async () => {
      const user = { username: "machinazo", password: "contrasena1233" };
      const endpoint = "/user/login/";

      const { body } = await request(app).post(endpoint).send(user).expect(403);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with the right user and a right password", () => {
    test("Then it should response status 200 and a token ", async () => {
      const user = { username: "machinazo", password: "1234" };
      const endpoint = "/user/login/";

      const { body } = await request(app).post(endpoint).send(user).expect(200);

      expect(body).toHaveProperty("token");
    });
  });
});

describe("Given a /user/ads/id endpoint", () => {
  describe("When it receives a request with an id of a user", () => {
    test("Then it should response a status 200 and the ads of that user", async () => {
      const endpoint = "/user/ads/623359fc14fef71610125a52";
      const numberOfAds = 1;

      const { body } = await request(app).get(endpoint).expect(200);

      expect(body).toHaveLength(numberOfAds);
    });
  });
});
describe("When it receives a request with a wrong id", () => {
  test("Then it should response a status 404 and an error", async () => {
    const endpoint = "/user/ads/wrong";

    const { body } = await request(app).get(endpoint).expect(404);

    expect(body).toHaveProperty("error");
  });
});
