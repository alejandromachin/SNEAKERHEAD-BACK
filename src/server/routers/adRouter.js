require("dotenv").config();
const express = require("express");
const multer = require("multer");

const {
  loadSneakerAds,
  loadSneakerAdInfo,
} = require("../controllers/adsController/adsController");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/:id", loadSneakerAds);
router.get("/detail/:id", loadSneakerAdInfo);
router.get("/new", upload.array("images"), createAd);

module.exports = router;
