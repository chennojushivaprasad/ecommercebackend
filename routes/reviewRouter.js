const express = require("express");
const {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");

const reviewRouter = express();

reviewRouter.get("/:productId", getProductReviews);

reviewRouter.post("/add/:productId", isAuthenticatedUser, addReview);

// reviewRouter.put("/update/:reviewId", isAuthenticatedUser, updateReview);

reviewRouter.delete("/remove/:reviewId", isAuthenticatedUser, deleteReview);

module.exports = reviewRouter;
