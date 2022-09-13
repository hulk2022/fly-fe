import CryptoJS from "crypto-js";

export const utils = {
  signGenerator(appSecret, reqStr) {
    const str = reqStr;
    const key = appSecret; //设置的秘钥
    const res = CryptoJS.HmacSHA256(str, key);
    const resStr = CryptoJS.enc.Hex.stringify(res);
    return resStr;
  },
};
