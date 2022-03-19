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
  });
  await Ad.create({
    _id: "622884a8c2b0a157923fa39b",
    brand: "Jordan",
    style: "1 high",
    colorway: "Navy",
    image1: "image",
    image2: "image",
    image3: "image",
    image4: "image",
    size: 40,
    likes: 0,
    price: "4.000€",
    box: "Good",
    condition: 10,
  });
  await Ad.create({
    _id: "622884cac2b0a157923fa39d",
    brand: "Jordan",
    style: "1 high",
    colorway: "Blue",
    image1: "image",
    image2: "image",
    image3: "image",
    image4: "image",
    size: 40,
    likes: 0,
    price: "4.000€",
    box: "Good",
    condition: 10,
  });
  await Ad.create({
    _id: "622884cac2b0a157923fa397",
    brand: "Jordan",
    style: "1 high",
    colorway: "Blue",
    image1: "image",
    image2: "image",
    image3: "image",
    image4: "image",
    size: 40,
    likes: 0,
    price: "4.000€",
    box: "Good",
    condition: 10,
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

describe("Given a 'ads/detail/:id' endpoint", () => {
  describe("When it receives a GET request and the id of an ad", () => {
    test("Then it should response with the ad and a code 200", async () => {
      const endpoint = "/ads/detail/62288281c2b0a157923fa397";

      const { body } = await request(app).get(endpoint).expect(200);

      expect(body).toHaveProperty("colorway", "Chicago");
    });
  });
});

describe("Given a 'ads/:id' endpoint", () => {
  describe("When it receives a DELETE request and the id of an ad", () => {
    test("Then it should response with the ad deleted and a code 200", async () => {
      const endpoint = "/ads/62288281c2b0a157923fa397";

      const { body } = await request(app).delete(endpoint).expect(200);

      expect(body).toHaveProperty("colorway", "Chicago");
    });
  });
  describe("When it receives a DELETE request and the id of an ad that does not exist", () => {
    test("Then it should response with an error with the message 'Sorry, we did not find the ad' and a code 404", async () => {
      const endpoint = "/ads/62288281c2b0a157923fa398";

      const { body } = await request(app).delete(endpoint).expect(404);

      expect(body).toHaveProperty("message", "Sorry, we did not find the ad");
    });
  });
  describe("When it receives a DELETE request and the id with an ivalid format", () => {
    test("Then it should response with an error with the message 'Sorry, we could not delete your item' and a code 500", async () => {
      const endpoint = "/ads/invalid";

      const { body } = await request(app).delete(endpoint).expect(500);

      expect(body).toHaveProperty(
        "message",
        "Sorry, we could not delete your item"
      );
    });
  });
});

describe("Given a /ads/hotdeals/load endpoint", () => {
  describe("When it receives GET request", () => {
    test("Then it should response with a 200 status and an array of 4 ads", async () => {
      const endpoint = "/ads/hotdeals/load";

      const { body } = await request(app).get(endpoint).expect(200);

      expect(body).toHaveLength(4);
    });
  });
});
