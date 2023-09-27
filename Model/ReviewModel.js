const { default: mongoose } = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fullname: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  reviewAddedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Review", reviewSchema);
