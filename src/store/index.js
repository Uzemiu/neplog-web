import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import blogConfig from "./property";
import getters from "./getters";
import common from "./common";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    blogConfig,
    common
  },
  getters
})

export default store
