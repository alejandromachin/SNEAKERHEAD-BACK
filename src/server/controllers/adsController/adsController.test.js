require("dotenv").config();
const fs = require("fs");
const Ad = require("../../../database/models/Ad");
const Sneaker = require("../../../database/models/Sneaker");
const User = require("../../../database/models/User");
const {
  loadSneakerAds,
  loadSneakerAdInfo,
  deleteAd,
  createAd,
  editAd,
} = require("./adsController");

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
}));
jest.mock("path", () => ({
  ...jest.requireActual("path"),
}));

jest.mock("firebase/storage", () => ({
  getStorage: () => "holaa",
  ref: () => {},
  getDownloadURL: async () => "download.url",
  uploadBytes: async () => {},
}));

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

describe("Given a loadSneakerAdInfo middleware", () => {
  describe("When it receives a request with an ID that does not exist", () => {
    test("Then it should call its response next method with an error", async () => {
      const sneakerId = "test";

      const req = {
        params: { id: sneakerId },
      };
      const error = new Error("The ad does not exist");
      const next = jest.fn();
      Ad.findById = jest.fn().mockResolvedValue(null);

      await loadSneakerAdInfo(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
describe("Given a deleteAd middleware", () => {
  describe("When it receives a request with an ID that does not exist", () => {
    test("Then it should call its response next method with an error", async () => {
      const adId = "test";

      const req = {
        params: { id: adId },
      };
      const error = new Error("Sorry, we did not find the ad");
      const next = jest.fn();
      Ad.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteAd(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with an ID that exists", () => {
    test("Then it should call its response json method with the ad with that ID", async () => {
      const ad = { id: "test" };
      const req = {
        params: { id: ad.id },
      };
      const res = {
        json: jest.fn(),
      };
      Ad.findByIdAndDelete = jest.fn().mockResolvedValue(ad);

      await deleteAd(req, res, null);

      expect(res.json).toHaveBeenCalledWith(ad);
    });
  });
});

describe("Given a createAd middleware", () => {
  describe("When it receives a request with the data of an ad", () => {
    test("Then it should call its res json method with the ad created", async () => {
      const newAd = {
        sneakerId: "test",
        brand: "test",
        style: "test",
        colorway: "test",
        condition: 10,
        images: ["test"],
        price: "10.000",
        size: 40,
        likes: 0,
        box: "good",
        state: "new",
        owner: "622b15710695a90af3e56a20",
      };
      const sneaker = {
        id: "123",
        brand: "Jordan",
        style: "1 high",
        colorway: "Chicago",
        releaseDate: "1/2/1980",
        image: "image",
        averagePrice: "4.000€",
        ads: [],
      };
      const newFile = {
        originalname: "ad.jpeg",
        filename: "test",
        path: "uploads/test",
      };
      const res = {
        json: jest.fn(),
      };

      const req = {
        body: newAd,
        files: {
          image1: [newFile],
          image2: [newFile],
          image3: [newFile],
          image4: [newFile],
        },
      };
      const user = { ads: [] };

      jest
        .spyOn(fs, "rename")
        .mockImplementation(
          (oldFilenameImage1, newFileNameImage1, callback) => {
            callback();
          }
        );
      jest.spyOn(fs, "readFile").mockImplementation((file, callback) => {
        callback(null, newFile);
      });
      Ad.create = jest.fn().mockResolvedValue(newAd);
      Sneaker.findById = jest.fn().mockResolvedValue(sneaker);
      Sneaker.findByIdAndUpdate = jest.fn().mockResolvedValue(sneaker);
      Ad.findByIdAndUpdate = jest.fn().mockResolvedValue(Ad);
      User.findById = jest.fn().mockResolvedValue(user);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      await createAd(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with the data of an ad but has an error", () => {
    test("Then it should call its next method", async () => {
      const ad = {
        sneakerId: "test",
        brand: "test",
        style: "test",
        colorway: "test",
        condition: 10,
        images: ["test"],
        price: "10.000",
        size: 40,
        likes: 0,
        box: "good",
        state: "new",
        owner: "622b15710695a90af3e56a20",
      };

      const sneaker = {
        id: "123",
        brand: "Jordan",
        style: "1 high",
        colorway: "Chicago",
        releaseDate: "1/2/1980",
        image: "image",
        averagePrice: "4.000€",
        ads: [],
      };
      const req = {
        body: ad,
        files: {
          image1: ["image1"],
          image2: ["image2"],
          image3: ["image3"],
          image4: ["image4"],
        },
      };
      const user = { ads: [] };

      const next = jest.fn();
      const res = {
        json: jest.fn(),
      };

      Ad.create = jest.fn().mockResolvedValue(ad);
      Sneaker.findById = jest.fn().mockResolvedValue(sneaker);
      Sneaker.findByIdAndUpdate = jest.fn().mockResolvedValue(sneaker);
      User.findById = jest.fn().mockResolvedValue(user);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      await createAd(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
describe("Given a editAd middleware", () => {
  describe("When it receives a request with the data of an ad to modify", () => {
    test("Then it should call its res json method with the ad modified", async () => {
      const adToModify = {
        sneakerId: "test",
        brand: "test",
        style: "test",
        colorway: "test",
        condition: 10,
        images: ["test"],
        price: "10.000",
        size: 40,
        likes: 0,
        box: "good",
        state: "new",
        owner: "622b15710695a90af3e56a20",
      };

      const newFile = {
        originalname: "ad.jpeg",
        filename: "test",
        path: "uploads/test",
      };
      const res = {
        json: jest.fn(),
      };

      const req = {
        body: adToModify,
        files: {
          image1: [newFile],
          image2: [newFile],
          image3: [newFile],
          image4: [newFile],
        },
        params: { id: "test" },
      };

      jest
        .spyOn(fs, "rename")
        .mockImplementation(
          (oldFilenameImage1, newFileNameImage1, callback) => {
            callback();
          }
        );
      jest.spyOn(fs, "readFile").mockImplementation((file, callback) => {
        callback(null, newFile);
      });

      Ad.findByIdAndUpdate = jest.fn().mockResolvedValue(Ad);

      await editAd(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a request with the data of an ad but has an error", () => {
    test("Then it should call its next method", async () => {
      const adToModify = {
        sneakerId: "test",
        brand: "test",
        style: "test",
        colorway: "test",
        condition: 10,
        images: ["test"],
        price: "10.000",
        size: 40,
        likes: 0,
        box: "good",
        state: "new",
        owner: "622b15710695a90af3e56a20",
      };
      const newFile = {
        originalname: "ad.jpeg",
        filename: "test",
        path: "uploads/test",
      };

      const req = {
        body: adToModify,
        files: {
          image1: [newFile],
          image2: [newFile],
          image3: [newFile],
          image4: [newFile],
        },
        params: { id: "test" },
      };
      const next = jest.fn();
      Ad.findByIdAndUpdate = jest.fn().mockResolvedValue(adToModify);

      await editAd(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
