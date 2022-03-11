require("dotenv").config();
const express = require("express");

const router = express.Router();

router.get("/:id", loadSneakerAds);

module.exports = router;
