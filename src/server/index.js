require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const { notFoundError } = require("./middlewares/errors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(notFoundError);

module.exports = { app };
