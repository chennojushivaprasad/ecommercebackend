const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  fullname: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: { type: String, default: "" },
  pincode: {
    type: String,
    required: true,
  },
  addresstype: {
    type: String,
    enum: ["home", "work"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
