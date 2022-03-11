const Sneaker = require("../../../database/models/Sneaker");
const { loadSneakerAds } = require("./adsController");

jest.mock("../../../database/models/Sneaker");

describe("Given loadSneakerAds middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request for a sneaker with no ads", () => {
    test("Then it should call it's next method with an error", async () => {
      const sneakerId = "test";
      const req = {
        params: { id: sneakerId },
      };
      const sneaker = {
        name: "ad",
        ads: [],
      };

      const next = jest.fn();

      Sneaker.findById = jest.fn().mockReturnThis();
      Sneaker.populate = jest.fn().mockResolvedValue(sneaker);

      const error = new Error(
        "Sorry, there are no ads related to this sneaker"
      );

      await loadSneakerAds(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request for a sneaker with 2 ads", () => {
    test("Then it should call it's res method with the array of ads", async () => {
      const sneakerId = "test";
      const req = {
        params: { id: sneakerId },
      };
      const sneaker = {
        name: "sneaker",
        ads: ["ad1", "ad2"],
        populate: jest.fn().mockResolvedValue({ ads: ["ad1", "ad2"] }),
      };
      const res = {
        json: jest.fn(),
      };

      Sneaker.findById = jest.fn().mockReturnThis();
      Sneaker.populate = jest.fn().mockResolvedValue(sneaker);

      await loadSneakerAds(req, res, null);

      expect(res.json).toHaveBeenCalledWith(sneaker.ads);
    });
  });
});
