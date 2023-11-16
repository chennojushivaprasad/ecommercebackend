const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  updateUser,
} = require("../controllers/userController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");

const userRouter = express();


userRouter.get("/user/:userId",isAuthenticatedUser, getUser);

userRouter.put("/user/:userId",isAuthenticatedUser, updateUser);

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout",isAuthenticatedUser, logout);

module.exports = userRouter;
