const Sneaker = require("../../../database/models/Sneaker");
const { getAllSneakers, moreInfoSneaker } = require("./sneakersController");

jest.mock("../../../database/models/Sneaker");

describe("Given getAllSneakers middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request", () => {
    test("Then it should call it's response json method with the sneakers", async () => {
      const brand = "Jordan";
      const req = {
        params: brand,
        query: { limit: "test", skip: "test" },
      };
      const res = {
        json: jest.fn(),
      };
      const sneakers = [{ sneaker: "test" }, { sneaker: "test" }];

      Sneaker.find = jest.fn().mockReturnThis();
      Sneaker.skip = jest.fn().mockReturnThis();
      Sneaker.limit = jest.fn().mockResolvedValue(sneakers);
      await getAllSneakers(req, res, null);

      expect(res.json).toHaveBeenCalledWith(sneakers);
    });
  });

  describe("When it receives a request with a brand that doesn't exist", () => {
    test("Then it should call it's next method with an error", async () => {
      const brand = "Jordan";
      const req = {
        params: brand,
      };
      const next = jest.fn();
      const error = new Error("We could not find any sneakers");

      Sneaker.find = jest.fn().mockResolvedValue(null);
      await getAllSneakers(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given moreInfoSneaker middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request with an id", () => {
    test("Then it should call the response json method with the sneaker with that id", async () => {
      const req = {
        params: { id: "id" },
      };
      const res = {
        json: jest.fn(),
      };
      const sneaker = {
        id: "id",
      };
      Sneaker.findById = jest.fn().mockResolvedValue(sneaker);

      await moreInfoSneaker(req, res, null);

      expect(res.json).toHaveBeenCalledWith(sneaker);
    });
  });
  describe("When it receives a request with an id that doesn't exist", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { id: "wrongID" },
      };

      const next = jest.fn();
      const error = new Error(
        "Sorry, we did not find the sneaker you are looking for"
      );

      Sneaker.findById = jest.fn().mockResolvedValue(null);
      await moreInfoSneaker(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
