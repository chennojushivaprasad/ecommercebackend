const Address = require("../Model/AddressModel.js");

exports.createAddress = async (req, res) => {
  const userId = req.authenticatedUser._id;
  try {
    const newAddress = new Address({ ...req.body, user: userId });
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyAddressList = async (req, res) => {
  const userId = req.authenticatedUser._id;
  try {
    const addresses = await Address.find({ user: userId });
    return res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(
      req.params.addressId
    );
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted", _id: req.params?.addressId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
