"use strict";

import Vue from 'vue';
import axios from "axios";
import qs from "qs";
import {Message, Notification} from "element-ui";
import router from "@/router";

const _axios = axios.create({
  baseURL: process.env["VUE_APP_BASE_API"] + "/api",
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

_axios.interceptors.request.use(
  function(config) {
    if(localStorage['token']){
      config.headers['Authorization'] = localStorage['token'];
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
    if(response.data){
      return response.data.data;
    } else {
      return response
    }
  },
  function(error) {
    const resp = error.response;
    if(!resp){
      Notification.error({
        title:"网络请求超时",
        duration: 5000});
      return Promise.reject(error);
    }
    if(resp.status === 401){
      router.push({path: '/401'});
    } else if(resp.status === 403){
      Message.error('对不起，你没有权限进行此操作');
    } else {
      if(resp.data.message){
        Message.error(resp.data.message);
      }
    }
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
