const { model, Schema } = require("mongoose");

const sneakerSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  colorway: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  averagePrice: {
    type: String,
    required: true,
  },
  ads: {
    type: [],
  },
});

const Sneaker = model("Sneaker", sneakerSchema, "sneakers");

module.exports = Sneaker;
