require("dotenv").config();
const express = require("express");
const {
  getAllSneakers,
} = require("../controllers/sneakersController/sneakersController");

const router = express.Router();

router.get("/", getAllSneakers);

module.exports = router;
