require("dotenv").config();
const express = require("express");
const multer = require("multer");

const {
  loadSneakerAds,
  loadSneakerAdInfo,
  createAd,
} = require("../controllers/adsController/adsController");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/:id", loadSneakerAds);
router.get("/detail/:id", loadSneakerAdInfo);
router.delete("/detail/:id", loadSneakerAdInfo);
router.post(
  "/new",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
  ]),
  createAd
);

module.exports = router;
