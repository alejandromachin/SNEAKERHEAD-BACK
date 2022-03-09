const User = require("../../../database/models/User");

const { registerUser } = require("./userController");

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
