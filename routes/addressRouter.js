const express = require("express");
const {getMyAddressList,getAddress,createAddress,updateAddress,deleteAddress} = require("../controllers/AddressController");
const { isAuthenticatedUser } = require("../middleware/auth");
// const { authorizedRole } = require("../utils/authorizedRole");

const addressRouter = express();

addressRouter.use(isAuthenticatedUser);

addressRouter.get("/", getMyAddressList);
addressRouter.get("/:addressId", getAddress);
addressRouter.post("/add", createAddress);
addressRouter.put("/update/:addressId", updateAddress);
addressRouter.delete("/delete/:addressId", deleteAddress);

module.exports = addressRouter;
