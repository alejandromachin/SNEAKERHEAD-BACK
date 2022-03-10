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

const moreInfoSneaker = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sneaker = await Sneaker.findById(id);
    res.json(sneaker);
  } catch {
    const error = new Error(
      "Sorry, we did not find the sneaker you are looking for"
    );
    error.code = 404;
    next(error);
  }
};

module.exports = { getAllSneakers, moreInfoSneaker };
