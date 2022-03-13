require("dotenv").config();
const express = require("express");
const {
  loadSneakerAds,
} = require("../controllers/adsController/adsController");

const router = express.Router();

router.get("/:id", loadSneakerAds);
router.get("detail/:id", loadSneakerAdInfo);

module.exports = router;
