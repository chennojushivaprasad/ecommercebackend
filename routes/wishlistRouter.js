const express = require("express");
const {
  getMyWishList,
  checkWishlist,
  addToWishlist,
  removeFromWishList,
} = require("../controllers/wishlistController");
const { isAuthenticatedUser } = require("../middleware/auth");

const wishlistRouter = express();

wishlistRouter.get("/", isAuthenticatedUser, getMyWishList);

wishlistRouter.get("/check/:userId/:productId", checkWishlist);

wishlistRouter.post("/add", isAuthenticatedUser, addToWishlist);

wishlistRouter.delete("/remove", isAuthenticatedUser, removeFromWishList);

module.exports = wishlistRouter;
