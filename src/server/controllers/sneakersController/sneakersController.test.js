const Sneaker = require("../../../database/models/Sneaker");
const {
  getAllSneakers,
  moreInfoSneaker,
  getAllSneakersSlider,
  getAllSneakersByParam,
} = require("./sneakersController");

jest.mock("../../../database/models/Sneaker");

describe("Given getAllSneakers middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request", () => {
    test("Then it should call it's response json method with the sneakers", async () => {
      const req = {
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

  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        query: { limit: "test", skip: "test" },
      };
      const next = jest.fn();
      const error = new Error("We could not find any sneakers");

      Sneaker.find = jest.fn().mockResolvedValue(null);
      await getAllSneakers(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given getAllSneakersByBrand middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request", () => {
    test("Then it should call it's response json method with the sneakers", async () => {
      const brand = "Jordan";
      const req = {
        params: { param: brand },
        query: { limit: "test", skip: "test" },
      };
      const res = {
        json: jest.fn(),
      };
      const sneakers = [
        { brand: "jordan", colorway: "test", style: "test" },
        { brand: "jordan", colorway: "test", style: "test" },
      ];

      Sneaker.find = jest.fn().mockReturnThis();
      Sneaker.skip = jest.fn().mockReturnThis();
      Sneaker.limit = jest.fn().mockResolvedValue(sneakers);

      await getAllSneakersByParam(req, res, null);

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
      await getAllSneakersByParam(req, null, next);

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

describe("Given getAllSneakersSlider middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request", () => {
    test("Then it should call it's response json method with the sneakers", async () => {
      const res = {
        json: jest.fn(),
      };
      const sneakers = [{ sneaker: "test" }, { sneaker: "test" }];

      Sneaker.find = jest.fn().mockReturnThis();
      Sneaker.limit = jest.fn().mockResolvedValue(sneakers);
      await getAllSneakersSlider(null, res, null);

      expect(res.json).toHaveBeenCalledWith(sneakers);
    });
  });

  describe("When it receives a request with a brand that doesn't exist", () => {
    test("Then it should call it's next method with an error", async () => {
      const next = jest.fn();
      const error = new Error("We could not find any sneakers");

      Sneaker.find = jest.fn().mockResolvedValue(null);
      await getAllSneakersSlider(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a getAllSneakersByParam controller", () => {
  describe("When it receives a request of a 'jordan' brand with limit of 2 and skip of 0", () => {
    test("Then it should call its response method with a maximum of 2 sneakers of that brand", async () => {
      const req = {
        params: { param: "all" },
        query: { limit: 2, skip: 0 },
      };
      const res = {
        json: jest.fn(),
      };

      const sneakers = [
        { brand: "jordan", id: "1" },
        { brand: "jordan", id: "2" },
      ];

      Sneaker.find = jest.fn().mockReturnThis();
      Sneaker.skip = jest.fn().mockReturnThis();
      Sneaker.limit = jest.fn().mockResolvedValue(sneakers);

      await getAllSneakersByParam(req, res, null);

      expect(res.json).toBeCalled();
    });
  });

  describe("When it receives a request of a 'jordan' brand with limit of 2 and skip of 0", () => {
    test("Then it should call its response method with a maximum of 2 sneakers of that brand", async () => {
      const req = {
        params: { param: "jordan red and blue" },
        query: { limit: 2, skip: 0 },
      };
      const res = {
        json: jest.fn(),
      };

      const sneakers = [
        { brand: "jordan", id: "1", style: "test", colorway: "test" },
        { brand: "test", id: "2", style: "test", colorway: "red" },
      ];

      Sneaker.find = jest.fn().mockReturnThis();
      Sneaker.skip = jest.fn().mockReturnThis();
      Sneaker.limit = jest.fn().mockResolvedValue(sneakers);

      await getAllSneakersByParam(req, res, null);

      expect(res.json).toBeCalled();
    });
  });
});
