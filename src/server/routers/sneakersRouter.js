require("dotenv").config();
const express = require("express");
const {
  getAllSneakers,
  moreInfoSneaker,
  getAllSneakersSlider,
} = require("../controllers/sneakersController/sneakersController");

const router = express.Router();

router.get("/", getAllSneakers);
router.get("/slider", getAllSneakersSlider);
router.get("/:id", moreInfoSneaker);

module.exports = router;
