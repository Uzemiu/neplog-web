"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from "qs";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = 'http://localhost/api'
// axios.defaults.headers.form['Authorization'] = AUTH_TOKEN;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
// axios.defaults.transformRequest = function(data){return data instanceof FormData ? data : JSON.stringify(data)}

let config = {
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);


_axios.interceptors.request.use(
  function(config) {
    if(localStorage.jwt){
      config.headers['Authorization'] = localStorage.jwt;
    }
    if(config.method.toLowerCase() === 'get'){
      config.paramsSerializer = params => {
        return qs.stringify(params,{indices:false})
      }
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    if(response.data.data){
      return response.data.data;
    } else {
      return response.data
    }

  },
  function(error) {
    return Promise.reject(error.response.data);
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

export default _axios;
