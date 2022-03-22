const { Joi } = require("express-validation");

const loginValidator = {
  body: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
};

module.exports = loginValidator;
