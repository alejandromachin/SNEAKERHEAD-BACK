require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectToDataBase = require("../../database");
const Sneaker = require("../../database/models/Sneaker");
const { app } = require("..");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Sneaker.create({
    brand: "Jordan",
    style: "1 high",
    colorway: "Chicago",
    releaseDate: "1/2/1980",
    image: "image",
    averagePrice: "4.000€",
  });
  await Sneaker.create({
    brand: "Jordan",
    style: "1 high",
    colorway: "Shadow",
    releaseDate: "1/2/1980",
    image: "image",
    averagePrice: "3.000€",
  });
  await Sneaker.create({
    brand: "Jordan",
    style: "1 high",
    colorway: "Navy",
    releaseDate: "1/2/1980",
    image: "image",
    averagePrice: "2.000€",
  });
});

afterEach(async () => {
  await Sneaker.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /sneakers/ endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should response with all the sneakers availables a code 200", async () => {
      const endpoint = "/sneakers/";
      const numberOfSneakers = 3;

      const { body } = await request(app).get(endpoint).expect(200);

      expect(body).toHaveLength(numberOfSneakers);
    });
  });
});
