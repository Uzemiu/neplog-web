"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from "qs";

const _axios = axios.create({
  baseURL: process.env["VUE_APP_BASE_API"] + "/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

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
