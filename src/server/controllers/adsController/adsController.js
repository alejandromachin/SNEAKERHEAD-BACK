const Sneaker = require("../../../database/models/Sneaker");

const loadSneakerAds = async (req, res, next) => {
  const { id } = req.params;
  const { ads } = await Sneaker.findById(id).populate("ads");
  if (ads.length === 0) {
    const error = new Error("Sorry, there are no ads related to this sneaker");
    next(error);
  } else {
    res.json(ads);
  }
};

module.exports = { loadSneakerAds };
