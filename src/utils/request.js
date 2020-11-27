"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from "qs";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = 'http://neptu.cn/api'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = function(data){return data instanceof FormData ? data : qs.stringify(data)}

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log(response);
    return response;
  },
  function(error) {
    console.log(error);
    // Do something with response error
    return Promise.reject(error);
  }
);
Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
