const Product = require("../Model/ProductModel.js");
const { ApiFeatures } = require("../utils/apiFeature.js");

const getAllProducts = async (req, res, next) => {
  const resultPerPage = parseInt(req.query.resultPerPage);
  const price = parseInt(req.query.price);
  const currentPage = parseInt(req.query.page);

  try {
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage)
      .sort({ price });

    const totalNumberOfItems = await Product.countDocuments(
      apiFeature.query._conditions
    );

    const products = await apiFeature.query;
    return res
      .status(200)
      .json({ products, currentPage, totalNumberOfItems, resultPerPage });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No products found" });
  }
};

const getMyProducts = async (req, res, next) => {
  const resultPerPage = 5;
  try {
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .pagination(resultPerPage);
    const totalNumberOfItems = await Product.countDocuments(
      apiFeature.query._conditions
    );
    const products = await apiFeature.query;
    return res
      .status(200)
      .json({ products, resultPerPage, totalNumberOfItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No products found" });
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return console.log(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    return console.log(error);
  }

  if (!product) {
    return res
      .status(500)
      .json({ successStatus: false, message: "Product Not Found" });
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidatores: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    successStatus: true,
    product,
  });
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .json({ successStatus: true, message: "Product deleted succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ successStatus: false, message: "Error:failed to remove" });
    return console.log(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.authenticatedUser._id,
    });
    res.status(200).json({ successStatus: true, product });
    return;
  } catch (error) {
    res.status();
    return console.log("error", error);
  }
};

const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    userId: req.authenticatedUser._id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (review) => review.userId === req.authenticatedUser._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.userId === req.authenticatedUser._id) {
        (rev.rating = rating), (rev.comment = comment);
        return;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  product.ratings = Math.round(
    product.reviews.reduce((total, rev) => total + rev.rating, 0) /
      numberOfReviews,
    1
  );

  await product.save();

  res.status(200).json({ message: "success" });
};

const deleteProductReview = async (req, res, next) => {
  const { productId } = req.body;
  const product = Product.findById(productId);

  if (!product) {
    return;
  }

  const reviews = product.reviews.filter(
    (rev) => rev.userId !== req.authenticatedUser._id
  );

  const ratings =
    reviews.reduce((total, rev) => total + rev.rating, 0) / numberOfReviews;

  const numberOfReviews = reviews.length;
  await product.finByIdAndUpdate(productId, {
    reviews,
    ratings,
    numberOfReviews,
  });
};

module.exports.getAllProducts = getAllProducts;
module.exports.getMyProducts = getMyProducts;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;

module.exports.createProductReview = createProductReview;
module.exports.deleteProductReview = deleteProductReview;
