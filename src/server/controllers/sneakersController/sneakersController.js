const Sneaker = require("../../../database/models/Sneaker");

const getAllSneakers = async (req, res, next) => {
  try {
    const limit = +req.query.limit;
    const skip = +req.query.skip;
    const allSneakers = await Sneaker.find().skip(skip).limit(limit);

    res.json(allSneakers);
  } catch {
    const error = new Error("We could not find any sneakers");
    error.code = 404;
    next(error);
  }
};

const getAllSneakersByParam = async (req, res, next) => {
  try {
    const { param } = req.params;

    const limit = +req.query.limit;
    const skip = +req.query.skip;

    if (param === "all") {
      const allSneakers = await Sneaker.find().skip(skip).limit(limit);
      res.json(allSneakers);
    } else {
      const allSneakers = await Sneaker.find({
        fullName: { $regex: param, $options: "i" },
      })
        .skip(skip)
        .limit(limit);
      if (allSneakers.length === 0) {
        const error = new Error("We could not find any sneakers");
        error.code = 404;
        next(error);
      } else {
        res.json(allSneakers);
      }
    }
  } catch {
    const error = new Error("We could not find any sneakers");
    error.code = 404;
    next(error);
  }
};
const getAllSneakersSlider = async (req, res, next) => {
  try {
    const allSneakers = await Sneaker.find().limit(20);
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

module.exports = {
  getAllSneakers,
  moreInfoSneaker,
  getAllSneakersSlider,
  getAllSneakersByParam,
};
