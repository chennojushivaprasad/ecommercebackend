const Review = require("../Model/ReviewModel.js");

const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  const resultsPerPage = parseInt(req.query.resultsPerPage);
  const currentPage = parseInt(req.query.currentPage);
  try {
    const totalNumberOfItems = await Review.countDocuments({
      productId,
    });
    const reviews = await Review.find({ productId })
      .skip((currentPage - 1) * resultsPerPage)
      .limit(resultsPerPage)
      .sort({ rating: -1 });
    return res
      .status(200)
      .json({ reviews, resultsPerPage, totalNumberOfItems });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const addReview = async (req, res) => {
  const {productId} = req.params;
  const userId = req?.authenticatedUser?._id;
  const { rating, comment, fullname } = req.body;

  let isExistingReview = false
  try {
    let existingReview = await Review.findOne({ userId, productId });
   
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.fullname = fullname;
      isExistingReview = true
      await existingReview.save();
    } else {
      existingReview = new Review({
        userId,
        productId,
        rating,
        fullname,
        comment,
      });
      await existingReview.save();
    }
    
    res.status(200).json({ review: existingReview ,isExistingReview});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating or updating review" });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    await Review.findOneAndDelete(reviewId);
    return res.status(200).json({ reviewId, message: "deleted review" });
  } catch (error) {
    return res.status(500).json({ message: "failed to delete review" });
  }
};

module.exports.getProductReviews = getProductReviews;
module.exports.addReview = addReview;
// module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;
