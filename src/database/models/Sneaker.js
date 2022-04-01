const { model, Schema } = require("mongoose");
const Ad = require("./Ad");

const sneakerSchema = new Schema({
  fullName: { type: String, required: true },
  brand: {
    type: String,
    required: true,
  },
  style: {
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
    type: [Schema.Types.ObjectId],
    ref: Ad,
  },
});

const Sneaker = model("Sneaker", sneakerSchema, "sneakers");

module.exports = Sneaker;
