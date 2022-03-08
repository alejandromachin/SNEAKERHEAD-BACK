require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(notFoundError);
app.use(generalError);

module.exports = { app };
