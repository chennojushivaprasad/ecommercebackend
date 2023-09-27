const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("cart", cartSchema);
