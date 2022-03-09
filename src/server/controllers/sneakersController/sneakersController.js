const Sneaker = require("../../../database/models/Sneaker");

const getAllSneakers = async (req, res, next) => {
  try {
    const allSneakers = await Sneaker.find();
    res.json(allSneakers);
  } catch {
    const error = new Error("We could not find any sneakers");
    error.code = 404;
    next(error);
  }
};

module.exports = { getAllSneakers };
