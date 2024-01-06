const {getToken} = require("./getTokenController")

const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const refundTransaction = async () => {
  try {
    const {trxID, amount, paymentID, reason, sku} = req.body
    const token = await getToken();
    payload = {
      trxID,
      amount,
      paymentID,
      reason: reason ?? "Refund",
      sku: sku ?? "NA",
    };
    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };
    const data = await post(
      `${base_URL}/general/searchTransaction`,
      payload,
      headers
    );
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {refundTransaction}
