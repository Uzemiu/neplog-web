import CryptoJs from 'crypto-js'


let key = CryptoJs.enc.Utf8.parse("I8KI6i+3UhXVd02N");
let option = {
  mode: CryptoJs.mode.ECB,
  padding: CryptoJs.pad.Pkcs7
}

export default {
  encrypt(content) {
    let srcs = CryptoJs.enc.Utf8.parse(content);
    let encrypted = CryptoJs.AES.encrypt(srcs, key, option);
    return encrypted.toString();
  },
  decrypt(content) {
    let decrypt = CryptoJs.AES.decrypt(content, key, option);
    return CryptoJs.enc.Utf8.stringify(decrypt).toString();
  }

}
