const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    fullname: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    landmark: { type: String, default: "" },
    pincode: { type: Number, required: true },
    mobileNo: { type: Number, required: true },
    addresstype: { type: String },
  },
  orderItems: [orderItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentInfo: {
    id: {
      type: String,
      required: function () {
        return this.paymentInfo && this.paymentInfo.status !== "COD";
      },
    },
    status: { type: String, required: true },
  },
  paidAt: { type: Date },
  itemsPrice: { type: Number, default: 0, required: true },
  shippingPrice: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
  deliveredAt: Date,
  orderStatus: { type: String, default: "InProgress" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
