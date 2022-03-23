const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response json method with an error and status with 404", async () => {
      const error = { error: true, message: "Endpoint not found" };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const statusCode = 404;

      await notFoundError(null, res);

      expect(res.status).toBeCalledWith(statusCode);
      expect(res.json).toBeCalledWith(error);
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response json method with the message 'all wrong' and status 500", async () => {
      const errorCode = 500;
      const err = { error: true, message: "General error", code: errorCode };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      await generalError(err, null, res);

      expect(res.status).toBeCalledWith(errorCode);
      expect(res.json).toBeCalledWith(err);
    });
  });
  describe("When it receives a request without the error code or message", () => {
    test("Then it should call the response json method with the message 'General error' and status 500", async () => {
      const err = { error: true };
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      const errorMessage = "General error";

      const expectedError = {
        error: true,
        message: errorMessage,
        code: 500,
      };
      await generalError(err, null, res);

      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith(expectedError);
    });
  });
});
