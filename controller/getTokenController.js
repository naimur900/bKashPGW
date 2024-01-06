const { grantToken, refreshToken } = require("./tokenController");
const dotenv = require("dotenv");
dotenv.config();
const username = "sandboxTokenizedUser02";
const password = "sandboxTokenizedUser02@12345";
const app_key = "4f6o0cjiki2rfm34kfdadl1eqq";
const app_secret = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b";

let token = "";
let refToken = "";
let tokenIssueTime = 0;

const getToken = async () => {
  try {
    if (token === "") {
      const { statusCode, statusMessage, id_token, refresh_token } =
        await grantToken(username, password, app_key, app_secret);

      if (statusMessage === "Successful" && statusCode === "0000") {
        refToken = refresh_token;
        token = id_token;
        tokenIssueTime = Date.now();
        return token;
      }
    }
    const remainingTokenTime = (Date.now() - tokenIssueTime) / 1000;

    if (remainingTokenTime < 3000) {
      return token;
    } else {
      const { statusCode, statusMessage, id_token, refresh_token } =
        refreshToken(username, password, app_key, app_secret, refToken);
      if (statusMessage === "Successful" && statusCode == "0000") {
        refToken = refresh_token;
        token = id_token;
        tokenIssueTime = Date.now();
        return token;
      }
    }
  } catch (error) {
    return error;
  }
};

module.exports = { getToken };
