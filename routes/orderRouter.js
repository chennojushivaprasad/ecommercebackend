const express = require("express")
const {isAuthenticatedUser} = require("../middleware/auth")
const { newOrder,getOrder,getAllOrders, getMyOrders, updateOrder,deleteOrder, checkOrder } = require("../controllers/orderController.js")
const { authorizedRole } = require("../utils/authorizedRole.js")

const orderRouter = express()

orderRouter.use(isAuthenticatedUser)

orderRouter.get("/order/:orderId",getOrder)
orderRouter.get("/checkorder/:userId/:productId",checkOrder)
orderRouter.get("/myOrders",getMyOrders)
orderRouter.get("/admin/allOrders",authorizedRole("admin"),getAllOrders)

orderRouter.post("/order/new",newOrder)
orderRouter.put("/admin/order/:orderId",authorizedRole("admin"),updateOrder)
orderRouter.delete("/admin/order/:orderId",authorizedRole("admin"),deleteOrder)

module.exports = orderRouter