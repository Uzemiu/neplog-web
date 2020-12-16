import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import config from "./config";
import getters from "./getters";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    config
  },
  getters
})

export default store
