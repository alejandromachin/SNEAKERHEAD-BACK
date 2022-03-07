require("dotenv").config();
const morgan = require("morgan");
const express = require("express");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

module.exports = { app };
