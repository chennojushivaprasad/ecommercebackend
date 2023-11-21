const Cart = require("../Model/CartModel.js");

const getCart = async (req, res, next) => {};

const getMyCartItems = async (req, res, next) => {
  const userId = req.authenticatedUser._id;
  try {
    const totalNumberOfItems = await Cart.countDocuments({ userId });

    const cartList = await Cart.find({ userId })
      .sort({ timeStamp: -1 })
      .populate("product");

    return res.status(200).json({ cartList, totalNumberOfItems });
  } catch (error) {
    console.log(error);
  }
};

const checkCart = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.authenticatedUser._id;
  try {
    const data = await Cart.findOne({ userId, product: productId });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ message: "item not added" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const addCartItem = async (req, res, next) => {
  const { userId } = req.params;
  const cart = new Cart({ ...req.body, userId });
  try {
    const data = await Cart.findOne({
      userId,
      product: req.body.product,
    });

    if (!data) {
      const doc = await cart.save().populate("product");
      return res.status(201).json(doc);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateCartItem = async (req, res, next) => {
  const { cartId } = req.params;
  const { quantity } = req.body;
  try {
    const data = await Cart.findOneAndUpdate(
      {
        _id: cartId,
      },
      {
        $set: { quantity: quantity },
      },
      {
        new: true,
      }
    ).populate("product");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteCartItem = async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const data = await Cart.findByIdAndDelete(cartId);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

const resetCart = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const data = await Cart.deleteMany({userId});
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getMyCartItems = getMyCartItems;
module.exports.getCart = getCart;
module.exports.checkCart = checkCart;
module.exports.addCartItem = addCartItem;
module.exports.updateCartItem = updateCartItem;
module.exports.deleteCartItem = deleteCartItem;
module.exports.resetCart = resetCart;
