require("dotenv").config();
const express = require("express");
const {
  getAllSneakersByBrand,
} = require("../controllers/sneakersController/sneakersController");

const router = express.Router();

router.get("/:brand", getAllSneakersByBrand);

module.exports = router;
