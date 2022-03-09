const { model, Schema } = require("mongoose");

const adSchema = new Schema({
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
  images: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
});

const Ad = model("Ad", adSchema, "ads");

module.exports = Ad;
