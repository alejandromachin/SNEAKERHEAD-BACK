require("dotenv").config();
const express = require("express");
const {
  getAllSneakers,
  moreInfoSneaker,
  getAllSneakersSlider,
  getAllSneakersByBrand,
} = require("../controllers/sneakersController/sneakersController");

const router = express.Router();

router.get("/", getAllSneakers);
router.get("/slider", getAllSneakersSlider);
router.get("/:id", moreInfoSneaker);
router.get("/brand/:brand", getAllSneakersByBrand);

module.exports = router;
