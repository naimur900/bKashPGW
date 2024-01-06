const {getToken} = require("./getTokenController")

const app_key = process.env.APP_KEY;
const base_URL = process.env.BASE_URL;

const searchTransaction = async (trxID) => {
  try {
    const token = await getToken();
    payload = {
      trxID,
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

module.exports = {searchTransaction}