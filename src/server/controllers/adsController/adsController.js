require("dotenv").config();
const fs = require("fs");
const path = require("path");

const Ad = require("../../../database/models/Ad");
const Sneaker = require("../../../database/models/Sneaker");

const loadSneakerAds = async (req, res, next) => {
  const { id } = req.params;

  const { ads } = await Sneaker.findById(id).populate("ads");

  if (ads.length === 0) {
    const error = new Error("Sorry, there are no ads related to this sneaker");
    error.code = 404;
    next(error);
  } else {
    res.json(ads);
  }
};

const loadSneakerAdInfo = async (req, res, next) => {
  const { id } = req.params;

  const adInfo = await Ad.findById(id);

  if (adInfo === null) {
    const error = new Error("The ad does not exist");
    error.code = 404;
    next(error);
  } else {
    res.json(adInfo);
  }
};
const createAd = async (req, res, next) => {
  const data = req.body;
  try {
    const newAd = await Ad.create(data);

    const oldFilenameImage1 = path.join(
      "uploads",
      req.files.image1[0].filename
    );

    const newFileNameImage1 = path.join(
      "uploads",
      req.files.image1[0].originalname
    );

    const oldFilenameImage2 = path.join(
      "uploads",
      req.files.image2[0].filename
    );
    const newFileNameImage2 = path.join(
      "uploads",
      req.files.image2[0].originalname
    );
    const oldFilenameImage3 = path.join(
      "uploads",
      req.files.image3[0].filename
    );
    const newFileNameImage3 = path.join(
      "uploads",
      req.files.image3[0].originalname
    );

    const oldFilenameImage4 = path.join(
      "uploads",
      req.files.image4[0].filename
    );
    const newFileNameImage4 = path.join(
      "uploads",
      req.files.image4[0].originalname
    );

    fs.rename(oldFilenameImage1, newFileNameImage1, (error) => {
      if (error) {
        next(error);
      }
    });
    fs.rename(oldFilenameImage2, newFileNameImage2, (error) => {
      if (error) {
        next(error);
      }
    });
    fs.rename(oldFilenameImage3, newFileNameImage3, (error) => {
      if (error) {
        next(error);
      }
    });
    fs.rename(oldFilenameImage4, newFileNameImage4, (error) => {
      if (error) {
        next(error);
      }
    });

    res.json(newAd);
  } catch {
    const error = new Error("Sorry, we could not list your item.");
    next(error);
  }
};

module.exports = { loadSneakerAds, loadSneakerAdInfo, createAd };
