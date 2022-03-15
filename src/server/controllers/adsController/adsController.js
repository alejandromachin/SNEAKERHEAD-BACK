require("dotenv").config();
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const fs = require("fs");
const path = require("path");

const Ad = require("../../../database/models/Ad");
const Sneaker = require("../../../database/models/Sneaker");
const storage = require("../../utils/firebaseConfig");

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
  const images = [];
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
    // const oldFilenameImage3 = path.join(
    //   "uploads",
    //   req.files.image3[0].filename
    // );
    // const newFileNameImage3 = path.join(
    //   "uploads",
    //   req.files.image3[0].originalname
    // );
    // const oldFilenameImage4 = path.join(
    //   "uploads",
    //   req.files.image4[0].filename
    // );
    // const newFileNameImage4 = path.join(
    //   "uploads",
    //   req.files.image4[0].originalname
    // );
    const url1 = async () => {
      const image1Url3level = await fs.rename(
        oldFilenameImage1,
        newFileNameImage1,
        async () => {
          const image1Url2level = await fs.readFile(
            newFileNameImage1,
            async (error, file) => {
              if (error) {
                next(error);
              } else {
                const fileRef = ref(storage, newFileNameImage1);
                await uploadBytes(fileRef, file);

                const image1Url = await getDownloadURL(fileRef);
                return image1Url;
                // const ad = await Ad.findById(newAd.id);

                // ad.images.push(image1Url);

                // await Ad.findByIdAndUpdate(newAd.id, {
                //   images: ad.images,
                // });
              }
              return image1Url2level;
            }
          );
        }
      );
      return image1Url3level;
    };

    const url2 = async () => {
      const image2Url3level = await fs.rename(
        oldFilenameImage2,
        newFileNameImage2,
        async () => {
          const image2Url2level = await fs.readFile(
            newFileNameImage2,
            async (error, file) => {
              if (error) {
                next(error);
              } else {
                const fileRef = ref(storage, newFileNameImage2);
                await uploadBytes(fileRef, file);

                const image2Url = await getDownloadURL(fileRef);
                return image2Url;
              }
              return image2Url2level;
            }
          );
        }
      );
      return image2Url3level;
    };

    (async () => {
      await url1();
      await url2();
      images.push(url1);
      images.push(url2);
      await Ad.findByIdAndUpdate(newAd.id, {
        images,
      });
    })();

    // await fs.rename(oldFilenameImage2, newFileNameImage2, async () => {
    //   await fs.readFile(newFileNameImage2, async (error, file) => {
    //     if (error) {
    //       next(error);
    //     }
    //     const fileRef = ref(storage, newFileNameImage2);
    //     await uploadBytes(fileRef, file);

    //     const image2Url = await getDownloadURL(fileRef);

    //     const ad = await Ad.findById(newAd.id);

    //     ad.images.push(image2Url);

    //     await Ad.findByIdAndUpdate(newAd.id, {
    //       images: ad.images,
    //     });
    //   });
    // });

    // await fs.rename(oldFilenameImage3, newFileNameImage3, async () => {
    //   await fs.readFile(newFileNameImage3, async (error, file) => {
    //     if (error) {
    //       next(error);
    //     }
    //     const fileRef = ref(storage, newFileNameImage3);
    //     await uploadBytes(fileRef, file);

    //     const image3Url = await getDownloadURL(fileRef);

    //     const ad = await Ad.findById(newAd.id);

    //     ad.images.push(image3Url);

    //     await Ad.findByIdAndUpdate(newAd.id, {
    //       images: ad.images,
    //     });
    //   });
    // });
    // await fs.rename(oldFilenameImage4, newFileNameImage4, async () => {
    //   await fs.readFile(newFileNameImage4, async (error, file) => {
    //     if (error) {
    //       next(error);
    //     }
    //     const fileRef = ref(storage, newFileNameImage4);
    //     await uploadBytes(fileRef, file);

    //     const image4Url = await getDownloadURL(fileRef);

    //     const ad = await Ad.findById(newAd.id);
    //     ad.images.push(image4Url);

    //     await Ad.findByIdAndUpdate(newAd.id, {
    //       images: ad.images,
    //     });
    //   });
    // });

    res.json(newAd);
  } catch {
    const error = new Error("Sorry, we could not list your item.");
    next(error);
  }
};

module.exports = { loadSneakerAds, loadSneakerAdInfo, createAd, deleteAd };
