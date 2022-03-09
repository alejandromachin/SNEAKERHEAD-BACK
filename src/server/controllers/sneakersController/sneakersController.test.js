const Sneaker = require("../../../database/models/Sneaker");
const { getAllSneakersByBrand } = require("./sneakersController");

jest.mock("../../../database/models/Sneaker");

describe("Given getAllSneakersByBrand middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request with a brand that doesn't exist", () => {
    test("Then it should call it's next method with an error", async () => {
      const brand = "Jordan";
      const req = {
        params: brand,
      };
      const res = {
        json: jest.fn(),
      };
      const sneakers = [{ sneaker: "test" }, { sneaker: "test" }];

      Sneaker.find = jest.fn().mockResolvedValue(sneakers);
      await getAllSneakersByBrand(req, res);

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
      const error = new Error("We could not find any sneaker by that brand");

      Sneaker.find = jest.fn().mockResolvedValue(null);
      await getAllSneakersByBrand(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
