const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../../database/models/User");

const { registerUser, loginUser, loadUserAds } = require("./userController");

jest.mock("../../../database/models/User");

describe("Given a registerUser middleware", () => {
  describe("When it receives a request with an username already existing", () => {
    test("Then it should called its next method with an error message", async () => {
      const req = {
        body: "username",
      };
      const error = new Error("Sorry, username alredy taken");
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with an username that does not exist", () => {
    test("Then it should called its res method with the user created", async () => {
      const req = {
        body: { username: "username", password: "password" },
      };
      const res = {
        json: jest.fn(),
      };
      const userCreated = {
        username: "username",
        password: "encryptedPassword",
      };
      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(userCreated);

      await registerUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(userCreated);
    });
  });
});
describe("Given a getLogin function", () => {
  describe("When it receives a response", () => {
    test("Then if the user does not exist it should throw an error with the status code 404 and the error message 'Username or password are wrong'", async () => {
      const req = {
        body: { username: "machinazo", password: "1234" },
      };
      const next = jest.fn();
      const error = new Error("Username or password are wrong");
      User.find = jest.fn().mockRejectedValue(null);

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then if the user exists but the password is not correct", async () => {
      const req = {
        body: { username: "machinazo", password: "1234" },
      };
      const next = jest.fn();
      const error = new Error("Username or password are wrong");
      User.find = jest.fn().mockResolvedValue(req.body);
      bcrypt.compare = jest.fn().mockRejectedValue(false);

      await loginUser(req, null, next);

      expect(next).toBeCalledWith(error);
    });

    test("Then if the user exists and the password is right it should call the json method with the token", async () => {
      const req = {
        body: { username: "machinazo", password: "1234" },
      };
      const res = {
        json: jest.fn(),
      };
      const token = "this is a token";

      User.findOne = jest.fn().mockResolvedValue(req.body);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jsonwebtoken.sign = jest.fn().mockReturnValue(token);

      await loginUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});

describe("Given a loadUserAds middleware", () => {
  describe("When it receives a request with an id of an user that exist", () => {
    test("Then it should call the response json method with the ads of that user", async () => {
      const req = {
        params: { id: "test" },
      };
      const res = {
        json: jest.fn(),
      };
      const ads = [{ name: "ad" }, { name: "ad" }];

      User.findById = jest.fn().mockReturnThis();
      User.populate = jest.fn().mockResolvedValue({ ads });

      await loadUserAds(req, res, null);

      expect(res.json).toHaveBeenCalledWith(ads);
    });
  });
});
