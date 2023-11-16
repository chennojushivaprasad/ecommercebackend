const express = require("express");
const {
  getMyCartItems,
  getCart,
  checkCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
  resetCart
} = require("../controllers/cartController");
const { isAuthenticatedUser } = require("../middleware/auth");
// const { authorizedRole } = require("../utils/authorizedRole");

const cartRouter = express();

cartRouter.use(isAuthenticatedUser);

cartRouter.get("/mycart", getMyCartItems);
cartRouter.get("/:userId", getCart);
cartRouter.post("/add/:userId", addCartItem);
cartRouter.put("/update/:cartId", updateCartItem);
cartRouter.get("/check-cart/:productId", checkCart);
cartRouter.delete("/delete/:cartId", deleteCartItem);
cartRouter.delete("/reset/:userId", resetCart);

module.exports = cartRouter;
