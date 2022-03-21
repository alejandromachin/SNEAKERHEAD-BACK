require("dotenv").config();
const express = require("express");
const {
  getAllSneakers,
  moreInfoSneaker,
  getAllSneakersSlider,
  getAllSneakersByParam,
} = require("../controllers/sneakersController/sneakersController");

const router = express.Router();

router.get("/", getAllSneakers);
router.get("/slider", getAllSneakersSlider);
router.get("/:id", moreInfoSneaker);
router.get("/search/:param", getAllSneakersByParam);

module.exports = router;
