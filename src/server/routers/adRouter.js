require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const multer = require("multer");

const {
  loadSneakerAds,
  loadSneakerAdInfo,
  createAd,
  deleteAd,
  editAd,
  loadHotDeals,
} = require("../controllers/adsController/adsController");
const adValidator = require("../middlewares/adValidator");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/:id", loadSneakerAds);
router.get("/hotdeals/load", loadHotDeals);
router.get("/detail/:id", loadSneakerAdInfo);
router.delete("/:id", deleteAd);
router.post(
  "/new",
  validate(adValidator),
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
