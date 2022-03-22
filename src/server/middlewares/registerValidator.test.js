const { Joi } = require("express-validation");
const registerValidator = require("./registerValidator");

describe("Given an registerValidator schema", () => {
  describe("When it receives a request with the wrong format", () => {
    test("Then it should throw an error", () => {
      const userData = {
        name: "test",
        lastname: "test",
        username: "test",
        email: "test",
        city: "test",
        password: 1234,
      };

      expect(() => Joi.assert(userData, registerValidator)).toThrow();
    });
  });
  describe("When it receives a request with the right format", () => {
    test("Then it should return with an undefined", () => {
      const userData = {
        name: "test",
        lastname: "test",
        username: "test",
        email: "test",
        city: "test",
        password: "1234",
      };

      const validation = Joi.assert(userData, registerValidator.body);

      expect(validation).toBe(undefined);
    });
  });
});
