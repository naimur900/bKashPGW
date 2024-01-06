const { getToken } = require("./getTokenController");

const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const executePayment = async (req, res) => {
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
    const data = await post(`${base_URL}/execute`, payload, headers);
    // res.status(200).json({
    //   status: 200,
    //   message: data,
    // });
    res.send(data)
  } catch (error) {
    return error;
  }
};

module.exports = { executePayment };
