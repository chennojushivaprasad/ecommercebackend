const express = require("express");
const {
  getMyWishList,
  checkWishlist,
  addToWishlist,
  removeFromWishList,
} = require("../controllers/wishlistController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");

const wishlistRouter = express();

wishlistRouter.get("/", isAuthenticatedUser, getMyWishList);

wishlistRouter.get("/check/:userId/:productId", checkWishlist);

wishlistRouter.post("/add", isAuthenticatedUser, addToWishlist);

wishlistRouter.delete("/remove", isAuthenticatedUser, removeFromWishList);

module.exports = wishlistRouter;
