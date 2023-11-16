const express = require("express");
const cors = require("cors");

const app = express();

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const addressRouter = require("./routes/addressRouter");
const paymentRouter = require("./routes/paymentRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");


app.use(
  cors({
    origin: "https://bharatbhazaar.netlify.app",
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
