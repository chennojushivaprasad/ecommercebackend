const mongoose = require("mongoose");

const mongoDB = (mongodbURL) => {
  mongoose
    .connect(mongodbURL)
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log("DATABASE: not connected", error));
};
module.exports = mongoDB;
