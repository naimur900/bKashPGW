const { getToken } = require("./getTokenController");

const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const queryPayment = async (req, res) => {
  try {
    const { paymentID } = req.body;
    const token = await getToken();
    payload = {
      paymentID,
    };
    headers = {
      Authorization: token,
      "X-APP-Key": app_key,
    };
    const data = await post(`${base_URL}/payment/status`, payload, headers);

    res.send(data)
  } catch (error) {
    return error;
  }
};

module.exports = { queryPayment };
