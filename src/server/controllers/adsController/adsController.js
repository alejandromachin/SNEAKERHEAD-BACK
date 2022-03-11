const Sneaker = require("../../../database/models/Sneaker");

const loadSneakerAds = async (req, res, next) => {
  const { id } = req.params;
  const sneaker = await Sneaker.findById(id);
  const { ads } = await sneaker.populate("ads");

  if (ads.length === 0) {
    const error = new Error("Sorry, there are no ads related to this sneaker");
    error.code = 404;
    next(error);
  } else {
    res.json(ads);
  }
};

module.exports = { loadSneakerAds };
