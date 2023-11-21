const express = require("express");
const multer = require("multer");
const {
  getAllProducts,
  getMyProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProductReview,
  createProductReview,
} = require("../controllers/productController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const { authorizedRole } = require("../utils/authorizedRole.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, dest: "uploads/" });
const productRouter = express();

productRouter.get("/products", getAllProducts);
productRouter.get("/product/:id", getProduct);

productRouter.get(
  "/admin/products/",
  isAuthenticatedUser,
  authorizedRole("admin"),
  getMyProducts
);

productRouter.post(
  "/admin/product/addProduct",
  isAuthenticatedUser,
  authorizedRole("admin"),
  upload.single("productimage"),
  createProduct
);

productRouter.put(
  "/product/addProductReview",
  isAuthenticatedUser,
  createProductReview
);

productRouter.put(
  "/admin/product/deleteproduct",
  isAuthenticatedUser,
  authorizedRole("admin"),
  deleteProductReview
);

productRouter.put(
  "/admin/product/:productId",
  isAuthenticatedUser,
  authorizedRole("admin"),
  updateProduct
);

productRouter.delete(
  "/admin/product/:productId",
  isAuthenticatedUser,
  authorizedRole("admin"),
  deleteProduct
);

module.exports = productRouter;
