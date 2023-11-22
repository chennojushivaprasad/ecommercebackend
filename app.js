const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const app = express();

const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const cartRouter = require("./routes/cartRouter.js");
const wishlistRouter = require("./routes/wishlistRouter.js");
const addressRouter = require("./routes/addressRouter.js");
const paymentRouter = require("./routes/paymentRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const reviewRouter = require("./routes/reviewRouter.js");
const { findProjectRoot } = require("./utils/projectRoot.js");


dotenv.config({path:findProjectRoot(__dirname)})

app.use(
  cors({
    origin: process.env.BASE_URL,
  })
);

app.use(express.json());

app.use("/api", userRouter);

app.use("/api", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/wishlist", wishlistRouter);

app.use("/api/address", addressRouter);

app.use("/api/payments", paymentRouter);

app.use("/api/orders", orderRouter);

app.use("/api/reviews", reviewRouter);

module.exports = app;
