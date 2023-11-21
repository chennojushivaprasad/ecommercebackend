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

// const addReview = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const userId = req?.authenticatedUser?._id;

//     const reviewExists = await Review.findOne({ userId, productId });

//     if (reviewExists) {
//       return res
//         .status(400)
//         .json({ error: "Review already exists for this user and product" });
//     }

//     const review = new Review({
//       productId,
//       userId,
//       ...req.body,
//     });

//     const savedReview = await review.save();

//     return res
//       .status(201)
//       .json({ review: savedReview, message: "Review added successfully" });
//   } catch (error) {
//     console.error("Error adding review:", error);
//     return res.status(500).json({ error: "Failed to add review" });
//   }
// };

const addReview = async (req, res) => {
  const {productId} = req.params;
  const userId = req?.authenticatedUser?._id;
  const { rating, comment, fullname } = req.body;

  try {
    let existingReview = await Review.findOne({ userId, productId });
   
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.fullname = fullname;
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
    
    res.status(200).json({ review: existingReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating or updating review" });
  }
};

// const updateReview = async (req, res) => {
//   const { reviewId } = req.params;

//   try {
//     const data = await Review.findByIdAndUpdate(
//       reviewId,
//       { ...req.body },
//       { new: true }
//     );
//     return res.status(200).json({ review: data, message: "updated review" });
//   } catch (error) {
//     return res.status(500).json({ message: "failed to update review" });
//   }
// };

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
