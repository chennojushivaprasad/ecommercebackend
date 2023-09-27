const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true, minLength: 5, maxLength: 25 },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar: {
    url: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
    },
  },
  role: {
    type: String,
    default: "user",
  },
  mobileNo: { type: String },
  addresses: { type: [mongoose.Schema.Types.Mixed] },
});

module.exports = mongoose.model("User", userSchema);
