const { model, Schema } = require("mongoose");

const adSchema = new Schema({
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
  image1: {
    type: String,
    default: "",
  },
  image2: {
    type: String,
    default: "",
  },
  image3: {
    type: String,
    default: "",
  },
  image4: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  condition: {
    type: Number,
    required: true,
  },
  box: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ad = model("Ad", adSchema, "ads");

module.exports = Ad;
