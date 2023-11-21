const Order = require("../Model/OrderModel.js");
const Product = require("../Model/ProductModel.js");
const { ApiFeatures } = require("../utils/apiFeature.js");

const newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const newOrder = new Order({
    paymentInfo,
    shippingPrice,
    totalPrice,
    itemsPrice,
    shippingInfo,
    orderItems,
    paidAt: Date.now(),
    user: req.authenticatedUser._id,
  });

  try {
    const order = await newOrder.save();
    return res.status(201).json({ successStatus: true, order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("user", "name email");

    return res.status(200).json({ successStatus: true, order });
  } catch (error) {
    return console.log("error");
  }
};

const getAllOrders = async (req, res, next) => {
  const resultPerPage = parseInt(req.query.resultPerPage);
  const currentPage = parseInt(req.query.page);
 
  try {
    const apiFeature = new ApiFeatures(Order.find(), req.query)
      .filter()
      .pagination(resultPerPage);

    const totalNumberOfItems = await Order.countDocuments(
      apiFeature.query._conditions
    );
    const orders = await apiFeature.query;
    return res.status(200).json({
      successStatus: true,
      orders,
      totalNumberOfItems,
      resultPerPage,
      currentPage,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ successStatus: false, message: "Unauthorized user" });
  }
};

const getMyOrders = async (req, res, next) => {
  const userId = req.authenticatedUser?._id;
  const { orderStatus, resultsPerPage, currentPage } = req.query;

  let findQuery = {};

  if (orderStatus) {
    findQuery = { user: userId, orderStatus };
  } else {
    findQuery = { user: userId };
  }

  const totalNumberOfItems = await Order.countDocuments(findQuery);
  const skip = (currentPage - 1) * resultsPerPage;

  try {
    const orders = await Order.find(findQuery).skip(skip).limit(resultsPerPage);

    return res.status(200).json({
      successStatus: true,
      orders,
      totalNumberOfItems,
      currentPage: parseInt(currentPage),
    });
  } catch (error) {
    return console.log(error);
  }
};

const updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);

  if (order.orderStatus === "Delivered") {
    return res
      .status(400)
      .json({ message: "You have already delivered this order" });
  }

  order.orderStatus = req.body.orderStatus;

  if (
    req.body.orderStatus === "Delivered" &&
    order.orderStatus !== "Delivered"
  ) {
    order.deliveredAt = Date.now;
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  const updatedOrder = await order.save({ validateBeforeSave: false });

  return res.status(200).json({ successStatus: true, order: updatedOrder });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

const checkOrder = async (req, res, next) => {
  const { productId, userId } = req.params;

  try {
    const checkOrderData = await Order.findOne({
      user: userId,
      orderItems: {
        $elemMatch: { product: productId },
      },
    });

    if (checkOrderData) {
      return res
        .status(200)
        .json({ successStatus: true, order: checkOrderData });
    } else {
      return res
        .status(404)
        .json({ successStatus: false, message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ successStatus: false, message: "Internal server error" });
  }
};

module.exports.getAllOrders = getAllOrders;
module.exports.newOrder = newOrder;
module.exports.getOrder = getOrder;
module.exports.getMyOrders = getMyOrders;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;
module.exports.checkOrder = checkOrder;
