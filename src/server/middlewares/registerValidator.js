const { Joi } = require("express-validation");

const registerValidator = {
  body: Joi.object({
    name: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    city: Joi.string(),
    email: Joi.string(),
  }),
};

module.exports = registerValidator;
