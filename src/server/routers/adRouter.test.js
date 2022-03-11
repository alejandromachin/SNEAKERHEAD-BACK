require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectToDataBase = require("../../database");
const Sneaker = require("../../database/models/Sneaker");
const { app } = require("..");
const Ad = require("../../database/models/Ad");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Ad.create({
    _id: "62288281c2b0a157923fa397",
    brand: "Jordan",
    style: "1 high",
    colorway: "Chicago",
    images: ["image1", "image2"],
    likes: 0,
    price: "4.000€",
  });
  await Ad.create({
    _id: "622884a8c2b0a157923fa39b",
    brand: "Jordan",
    style: "1 high",
    colorway: "Navy",
    images: ["image1", "image2"],
    likes: 0,
    price: "4.000€",
  });
  await Ad.create({
    _id: "622884cac2b0a157923fa39d",
    brand: "Jordan",
    style: "1 high",
    colorway: "Blue",
    images: ["image1", "image2"],
    likes: 0,
    price: "4.000€",
  });
});

afterEach(async () => {
  await Ad.deleteMany({});
  await Sneaker.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /ads/:id endpoint", () => {
  describe("When it receives a GET request and the id of a sneaker", () => {
    test("Then it should response with all the ads availables of that sneaker and a code 200", async () => {
      await Sneaker.create({
        _id: "62288281c2b0a157923fa399",
        brand: "Jordan",
        style: "1 high",
        colorway: "Chicago",
        releaseDate: "1/2/1980",
        image: "image",
        averagePrice: "4.000€",
        ads: [
          "62288281c2b0a157923fa397",
          "622884a8c2b0a157923fa39b",
          "622884cac2b0a157923fa39d",
        ],
      });
      const endpoint = "/ads/62288281c2b0a157923fa399";
      const numberOfAds = 3;

      const { body } = await request(app).get(endpoint).expect(200);

      expect(body).toHaveLength(numberOfAds);
    });
  });
});
describe("Given a /ads/:id endpoint", () => {
  describe("When it receives a GET request and the id of a sneaker without ads", () => {
    test("Then it should response with an error and a code 404", async () => {
      await Sneaker.create({
        _id: "62288281c2b0a157923fa399",
        brand: "Jordan",
        style: "1 high",
        colorway: "Chicago",
        releaseDate: "1/2/1980",
        image: "image",
        averagePrice: "4.000€",
        ads: [],
      });
      const endpoint = "/ads/62288281c2b0a157923fa399";

      const { body } = await request(app).get(endpoint).expect(404);

      expect(body).toHaveProperty("error");
    });
  });
});
