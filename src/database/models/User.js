const { model, Schema } = require("mongoose");
const Ad = require("./Ad");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  admin: {
    default: false,
  },
  ads: {
    type: [Schema.Types.ObjectId],
    ref: Ad,
    default: [],
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
