const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendToken, getJWTToken } = require("../utils/jwtToken");

exports.register = async (req, res, next) => {
  const { fullname, email, password, avatar } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    emailExists = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  const user = new User({
    fullname,
    email,
    password: hashedPassword,
    avatar
  });

  if (emailExists === null) {
    const data = await user.save();
    const payload = { id: data._id };
    const accessToken = getJWTToken(payload);
    sendToken(user, accessToken, 200, res);
    return;
  }
  return res.status(400).json({ message: "user already exists" });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let userExists;
  try {
    userExists = await User.findOne({ email }).select("+password");
  } catch (error) {
    return console.log(error);
  }

  if (userExists) {
    const match = await bcrypt.compare(password, userExists.password);

    if (match) {
      const payload = { id: userExists._id };
      const accessToken = getJWTToken(payload);
      sendToken(userExists, accessToken, 200, res);
    } else {
      console.log("login:error");
      return res.status(401).json({ message: "login failed" });
    }
  } else {
    return res.status(500).json({ message: "user does not exist" });
  }
};

exports.logout = async (req, res, next) => {
  req.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    successStatus: true,
    message: "Logged Out",
  });
};

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(500)
        .json({ successStatus: false, message: "user does not exist" });
    }
    return res.status(200).json({ user, successStatus: true });
  } catch (error) {
    return console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { email, ...updateUser } = req?.body;
 
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(500)
        .json({ successStatus: false, message: "user does not exist" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...updateUser },
      { new: true }
    );

    return res.status(200).json({ successStatus: true, user: updatedUser });
  } catch (error) {
    return console.log(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return res
        .status(500)
        .json({ successStatus: false, message: "user does not exist" });
    }
    return res.status(200).json({ users, successStatus: true });
  } catch (error) {
    return console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {};
