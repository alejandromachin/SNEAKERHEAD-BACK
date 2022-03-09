const Sneaker = require("../../../database/models/Sneaker");

const getAllSneakersByBrand = async (req, res, next) => {
  const { brand } = req.params;
  try {
    const allSneakersByBrand = await Sneaker.find({ brand });
    res.json(allSneakersByBrand);
  } catch {
    const error = new Error("We could not find any sneaker by that brand");
    error.code = 404;
    next(error);
  }
};

module.exports = { getAllSneakersByBrand };
