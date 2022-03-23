require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { notFoundError, generalError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouter");
const sneakersRouter = require("./routers/sneakersRouter");
const adsRouter = require("./routers/adRouter");
// const corsOptions = require("./utils/corsOptions");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/user", userRouter);
app.use("/sneakers", sneakersRouter);
app.use("/ads", adsRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = { app };
