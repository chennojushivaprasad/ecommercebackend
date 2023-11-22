const razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

const { findProjectRoot } = require("../utils/projectRoot");

const projectRoot = findProjectRoot(__dirname);
dotenv.config({ path: projectRoot });

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const verifyRazorpaySignature = (
  order_id,
  razorpay_payment_id,
  razorpay_signature,
  secret
) => {
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(order_id + "|" + razorpay_payment_id)
    .digest("hex");

  return generated_signature === razorpay_signature;
};

module.exports.createOrder = async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_receipt",
  };

  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
};

module.exports.verifyPayment = async (req, res) => {
  const { payment_id, order_id, razorpay_signature } = req.body;

  const secret = process.env.RAZORPAY_SECRET_KEY;
  if (
    verifyRazorpaySignature(order_id, payment_id, razorpay_signature, secret)
  ) {
    try {
      const payment = await instance.payments.fetch(payment_id);
      if (payment.status === "captured") {
        res.json({ ok: true, paymentId: payment_id, status: "success" });
      } else {
        res.json({ ok: false, status: "failure" });
      }
    } catch (error) {
      console.error("Error fetching payment:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching payment" });
    }
  } else {
    // Signature verification failed
    res
      .status(400)
      .json({ success: false, message: "Invalid Razorpay signature" });
  }
};

// *************

// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

// const createOrder = ("/create-razorpay-order", async (req, res) => {
//   try {
//     const { amount, currency = "INR" } = req.body;

//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: "order_receipt",
//     };

//     const order = await razorpay.orders.create(options);

//     res.json(order);
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the order." });
//   }
// });

// module.exports.createOrder = createOrder
