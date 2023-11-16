const Wishlist = require("../Model/WishlistModel.js");

const getMyWishList = async (req, res) => {
  const user = req.authenticatedUser._id;
  const resultsPerPage = parseInt(req.query.resultsPerPage);
  const currentPage = parseInt(req.query.currentPage);

  try {
    const totalNumberOfItems = await Wishlist.countDocuments({user})
    const wishlist = await Wishlist.find({ user })
      .skip((currentPage - 1) * resultsPerPage)
      .limit(resultsPerPage)
      .sort({ addedAt: -1 })
      .populate("product");

    return res.status(200).json({ wishlist, resultsPerPage,currentPage,totalNumberOfItems });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const checkWishlist = async (req, res) => {
  const {userId} = req.params;
  const product = req.params.productId;

  try {
    const item = await Wishlist.findOne({ user:userId, product });

    if (item) {
      res.status(200).json({ isInWishlist: true });
    } else {
      res.status(200).json({ isInWishlist: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = req.authenticatedUser._id;

  const wishlist = new Wishlist({
    product: productId,
    user,
  });

  try {
    await wishlist.save();
    return res.status(200).json({ message: "added to wishlist" });
  } catch (error) {
    return res.status(500).json({ message: "failed to add item" });
  }
};

const removeFromWishList = async (req, res) => {
  const { productId } = req.body;
  const user = req.authenticatedUser._id;

  try {
    await Wishlist.findOneAndDelete({ product: productId, user });
    return res.status(200).json({ message: "removed from wishlist" });
  } catch (error) {
    return res.status(500).json({ message: "failed to remove from wishlist" });
  }
};

module.exports.getMyWishList = getMyWishList;
module.exports.checkWishlist = checkWishlist;
module.exports.addToWishlist = addToWishlist;
module.exports.removeFromWishList = removeFromWishList;
