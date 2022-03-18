require("dotenv").config();
const express = require("express");
const {
  registerUser,
  loginUser,
  loadUserAds,
} = require("../controllers/userController/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/ads/:id", loadUserAds);

module.exports = router;
