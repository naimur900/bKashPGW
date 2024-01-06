const { getToken } = require("./getTokenController");
const { axiosPost } = require("./postController");
// const dotenv = require("dotenv");
// dotenv.config();

// var app_key = process.env.APP_KEY;
// var base_URL = process.env.BASE_URL;
const base_URL =
  "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
const app_key = "4f6o0cjiki2rfm34kfdadl1eqq";

const createPayment = async (req, res) => {
  try {
    const { amount, payerReference, callbackURL } = req.body;
    const token = await getToken();
    // console.log(token);

    const payload = {
      mode: "0011",
      payerReference: payerReference?? "01619777283",
      callbackURL: callbackURL ?? "http://google.com",
      amount: amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "INV123",
    };
    const headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };
    const data = await axiosPost(`${base_URL}/create`, payload, headers);
    // res.status(200).json({
    //   status: true,
    //   message: data,
    // });
    res.send(data)
  } catch (error) {
    return error;
  }
};
module.exports = { createPayment };
