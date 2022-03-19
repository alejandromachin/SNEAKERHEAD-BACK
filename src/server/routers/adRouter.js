require("dotenv").config();
const express = require("express");
const multer = require("multer");

const {
  loadSneakerAds,
  loadSneakerAdInfo,
  createAd,
  deleteAd,
  editAd,
  loadHotDeals,
} = require("../controllers/adsController/adsController");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/:id", loadSneakerAds);
router.get("/hotdeals/load", loadHotDeals);
router.get("/detail/:id", loadSneakerAdInfo);
router.delete("/:id", deleteAd);
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
router.patch(
  "/:id",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" },
  ]),
  editAd
);

module.exports = router;
