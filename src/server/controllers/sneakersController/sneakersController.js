const Sneaker = require("../../../database/models/Sneaker");

const getAllSneakersByBrand = async (req, res, next) => {
  const { brand } = req.params;
  const allSneakersByBrand = await Sneaker.find({ brand });
};

module.exports = { getAllSneakersByBrand };
