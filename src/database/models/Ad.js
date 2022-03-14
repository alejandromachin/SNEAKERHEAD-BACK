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
  images: {
    type: Array,
  },
  price: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ad = model("Ad", adSchema, "ads");

module.exports = Ad;
