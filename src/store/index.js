import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import blogConfig from "./config";
import getters from "./getters";
import common from "./common";
import meta from "./meta"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    blogConfig,
    common,
    meta
  },
  getters
})

export default store
