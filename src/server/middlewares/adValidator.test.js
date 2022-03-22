const { Joi } = require("express-validation");
const adValidator = require("./adValidator");

describe("Given an adValidator schema", () => {
  describe("When it receives a request with the wrong format", () => {
    test("Then it should throw an error", () => {
      const ad = {
        brand: "test",
        style: "test",
        colorway: "test",
        image1: "test",
        image2: "test",
        image3: "test",
        image4: "test",
        price: "test",
        likes: "wrong",
        condition: 1234,
        box: "test",
        owner: "test",
        ownerMail: "test",
      };

      expect(() => Joi.assert(ad, adValidator)).toThrow();
    });
  });
  describe("When it receives a request with the right format", () => {
    test("Then it should return with an undefined", () => {
      const ad = {
        brand: "test",
        style: "test",
        colorway: "test",
        image1: "test",
        image2: "test",
        image3: "test",
        image4: "test",
        price: "test",
        likes: 0,
        condition: 1234,
        box: "test",
        owner: "test",
        ownerMail: "test",
      };

      const validation = Joi.assert(ad, adValidator.body);

      expect(validation).toBe(undefined);
    });
  });
});
