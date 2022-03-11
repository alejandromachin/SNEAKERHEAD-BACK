require("dotenv").config();
const express = require("express");
const {
  getAllSneakers,
  moreInfoSneaker,
} = require("../controllers/sneakersController/sneakersController");

const router = express.Router();

router.get("/", getAllSneakers);
router.get("/:id", moreInfoSneaker);

module.exports = router;
