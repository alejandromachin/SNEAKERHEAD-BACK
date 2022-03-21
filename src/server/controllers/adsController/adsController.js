require("dotenv").config();
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const path = require("path");

const Ad = require("../../../database/models/Ad");
const Sneaker = require("../../../database/models/Sneaker");
const User = require("../../../database/models/User");
const storage = require("../../utils/firebaseConfig");

const loadSneakerAds = async (req, res, next) => {
  const { id } = req.params;

  const limit = +req.query.limit;
  const skip = +req.query.skip;

  const { ads } = await Sneaker.findById(id)
    .populate("ads")
    .skip(skip)
    .limit(limit);

  if (ads.length === 0) {
    const error = new Error("Sorry, there are no ads related to this sneaker");
    error.code = 404;
    next(error);
  } else {
    res.json(ads);
  }
};

const loadHotDeals = async (req, res, next) => {
  try {
    const ads = await Ad.find();
    ads.sort((a, b) => b.likes - a.likes);

    res.json([ads[0], ads[1], ads[2], ads[3]]);
  } catch {
    const error = new Error("Sorry, there are no hot deals at the moment");
    error.code = 404;
    next(error);
  }
};
const deleteAd = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAd = await Ad.findByIdAndDelete(id);

    if (deletedAd === null) {
      const error = new Error("Sorry, we did not find the ad");
      error.code = 404;
      next(error);
    } else {
      res.json(deletedAd);
    }
  } catch {
    const error = new Error("Sorry, we could not delete your item");
    error.code = 500;
    next(error);
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
  const { sneakerId } = data;
  try {
    const newAd = await Ad.create(data);

    const sneaker = await Sneaker.findById(sneakerId);

    sneaker.ads.push(newAd.id);

    await Sneaker.findByIdAndUpdate(sneaker.id, sneaker);

    const owner = await User.findById(data.owner);

    owner.ads.push(newAd.id);

    await User.findByIdAndUpdate(owner.id, owner);

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

    fs.rename(oldFilenameImage1, newFileNameImage1, () => {
      fs.readFile(newFileNameImage1, async (error, file) => {
        if (error) {
          next(error);
        } else {
          const fileRef = ref(storage, newFileNameImage1);
          await uploadBytes(fileRef, file);

          const image1Url = await getDownloadURL(fileRef);

          await Ad.findByIdAndUpdate(newAd.id, {
            image1: image1Url,
          });
        }
      });
    });

    fs.rename(oldFilenameImage2, newFileNameImage2, () => {
      fs.readFile(newFileNameImage2, async (error, file) => {
        if (error) {
          next(error);
        } else {
          const fileRef = ref(storage, newFileNameImage2);
          await uploadBytes(fileRef, file);

          const image2Url = await getDownloadURL(fileRef);

          await Ad.findByIdAndUpdate(newAd.id, {
            image2: image2Url,
          });
        }
      });
    });

    fs.rename(oldFilenameImage3, newFileNameImage3, () => {
      fs.readFile(newFileNameImage3, async (error, file) => {
        if (error) {
          next(error);
        }
        const fileRef = ref(storage, newFileNameImage3);
        await uploadBytes(fileRef, file);

        const image3Url = await getDownloadURL(fileRef);

        await Ad.findByIdAndUpdate(newAd.id, {
          image3: image3Url,
        });
      });
    });

    fs.rename(oldFilenameImage4, newFileNameImage4, () => {
      fs.readFile(newFileNameImage4, async (error, file) => {
        if (error) {
          next(error);
        }
        const fileRef = ref(storage, newFileNameImage4);
        await uploadBytes(fileRef, file);

        const image4Url = await getDownloadURL(fileRef);

        await Ad.findByIdAndUpdate(newAd.id, {
          image4: image4Url,
        });
      });
    });
    res.json(newAd);
  } catch {
    const error = new Error("Sorry, we could not list your item.");
    next(error);
  }
};

const editAd = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;

  const { colorway, condition, price, size, state, box } = data;
  const infoToUpdate = {
    colorway,
    condition,
    price,
    size,
    state,
    box,
  };
  try {
    const editedAd = await Ad.findByIdAndUpdate(id, infoToUpdate, {
      new: true,
    });

    if (req.files.image1) {
      const oldFilenameImage1 = path.join(
        "uploads",
        req.files.image1[0].filename
      );

      const newFileNameImage1 = path.join(
        "uploads",
        req.files.image1[0].originalname
      );

      fs.rename(oldFilenameImage1, newFileNameImage1, () => {
        fs.readFile(newFileNameImage1, async (error, file) => {
          if (error) {
            next(error);
          } else {
            const fileRef = ref(storage, newFileNameImage1);
            await uploadBytes(fileRef, file);

            const image1Url = await getDownloadURL(fileRef);

            await Ad.findByIdAndUpdate(editedAd.id, {
              image1: image1Url,
            });
          }
        });
      });
    }
    if (req.files.image2) {
      const oldFilenameImage2 = path.join(
        "uploads",
        req.files.image2[0].filename
      );
      const newFileNameImage2 = path.join(
        "uploads",
        req.files.image2[0].originalname
      );

      fs.rename(oldFilenameImage2, newFileNameImage2, () => {
        fs.readFile(newFileNameImage2, async (error, file) => {
          if (error) {
            next(error);
          } else {
            const fileRef = ref(storage, newFileNameImage2);
            await uploadBytes(fileRef, file);

            const image2Url = await getDownloadURL(fileRef);

            await Ad.findByIdAndUpdate(editedAd.id, {
              image2: image2Url,
            });
          }
        });
      });
    }
    if (req.files.image3) {
      const oldFilenameImage3 = path.join(
        "uploads",
        req.files.image3[0].filename
      );
      const newFileNameImage3 = path.join(
        "uploads",
        req.files.image3[0].originalname
      );

      fs.rename(oldFilenameImage3, newFileNameImage3, () => {
        fs.readFile(newFileNameImage3, async (error, file) => {
          if (error) {
            next(error);
          }
          const fileRef = ref(storage, newFileNameImage3);
          await uploadBytes(fileRef, file);

          const image3Url = await getDownloadURL(fileRef);

          await Ad.findByIdAndUpdate(editedAd.id, {
            image3: image3Url,
          });
        });
      });
    }
    if (req.files.image4) {
      const oldFilenameImage4 = path.join(
        "uploads",
        req.files.image4[0].filename
      );
      const newFileNameImage4 = path.join(
        "uploads",
        req.files.image4[0].originalname
      );
      fs.rename(oldFilenameImage4, newFileNameImage4, () => {
        fs.readFile(newFileNameImage4, async (error, file) => {
          if (error) {
            next(error);
          }
          const fileRef = ref(storage, newFileNameImage4);
          await uploadBytes(fileRef, file);

          const image4Url = await getDownloadURL(fileRef);

          await Ad.findByIdAndUpdate(editedAd.id, {
            image4: image4Url,
          });
        });
      });
    }
    res.json(editedAd);
  } catch {
    const error = new Error("Sorry, we could not edit your item.");
    next(error);
  }
};

module.exports = {
  loadSneakerAds,
  loadSneakerAdInfo,
  createAd,
  deleteAd,
  editAd,
  loadHotDeals,
};
