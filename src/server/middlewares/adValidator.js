const { Joi } = require("express-validation");

const adValidator = {
  body: Joi.object({
    brand: Joi.string(),
    style: Joi.string(),
    colorway: Joi.string(),
    image1: Joi.string(),
    image2: Joi.string(),
    image3: Joi.string(),
    image4: Joi.string(),
    price: Joi.string(),
    likes: Joi.number(),
    condition: Joi.number(),
    box: Joi.string(),
    owner: Joi.string(),
    ownerMail: Joi.string(),
  }),
};

module.exports = adValidator;
