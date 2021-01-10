import UAParser from 'ua-parser-js';
const ua = new UAParser(navigator.userAgent);

export default {
  browser: ua.getBrowser(),
  os: ua.getOS()
};
