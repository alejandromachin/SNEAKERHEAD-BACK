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
    res.json(newAd);
  } catch {
    const error = new Error("Sorry, we could not list your item.");
    next(error);
  }
};

module.exports = { loadSneakerAds, loadSneakerAdInfo, createAd };
