const { Joi } = require("express-validation");
const loginValidator = require("./loginValidator");

describe("Given an loginValidator schema", () => {
  describe("When it receives a request with the wrong format", () => {
    test("Then it should throw an error", () => {
      const userData = {
        username: "test",
        password: 1234,
      };

      expect(() => Joi.assert(userData, loginValidator)).toThrow();
    });
  });
  describe("When it receives a request with the right format", () => {
    test("Then it should return with an undefined", () => {
      const userData = {
        username: "test",
        password: "1234",
      };

      const validation = Joi.assert(userData, loginValidator.body);

      expect(validation).toBe(undefined);
    });
  });
});
