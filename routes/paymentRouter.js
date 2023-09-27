const express = require("express");
const {createOrder,verifyPayment} = require("../controllers/PaymentController");
const { isAuthenticatedUser } = require("../middleware/auth");
// const { authorizedRole } = require("../utils/authorizedRole");

const paymentRouter = express();

paymentRouter.use(isAuthenticatedUser);

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify-payment", verifyPayment);

module.exports = paymentRouter;
