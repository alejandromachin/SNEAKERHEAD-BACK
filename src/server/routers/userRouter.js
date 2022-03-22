require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  registerUser,
  loginUser,
  loadUserAds,
} = require("../controllers/userController/userController");
const loginValidator = require("../middlewares/loginValidator");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", validate(loginValidator), loginUser);
router.get("/ads/:id", loadUserAds);

module.exports = router;
