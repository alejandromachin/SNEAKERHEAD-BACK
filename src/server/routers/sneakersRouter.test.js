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
    _id: "62288281c2b0a157923fa397",
    brand: "Jordan",
    style: "1 high",
    colorway: "Chicago",
    releaseDate: "1/2/1980",
    image: "image",
    averagePrice: "4.000€",
  });
  await Sneaker.create({
    _id: "622884a8c2b0a157923fa39b",
    brand: "Jordan",
    style: "1 high",
    colorway: "Shadow",
    releaseDate: "1/2/1980",
    image: "image",
    averagePrice: "3.000€",
  });
  await Sneaker.create({
    _id: "622884cac2b0a157923fa39d",
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
describe("Given a /sneakers/id endpoint", () => {
  describe("When it receives a GET request with an id", () => {
    test("Then it should response with  the sneaker with that id and a code 200", async () => {
      const endpoint = "/sneakers/62288281c2b0a157923fa397";

      const { body } = await request(app).get(endpoint).expect(200);

      expect(body).toHaveProperty("brand", "Jordan");
    });
  });
  describe("When it receives a GET request with an id that does not exist", () => {
    test("Then it should response with an error and a code 404", async () => {
      const endpoint = "/sneakers/62288281c2b0a157923fa397wrong";

      const { body } = await request(app).get(endpoint).expect(404);

      expect(body).toHaveProperty("error");
    });
  });
});
