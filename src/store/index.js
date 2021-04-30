import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import blogConfig from "./property";
import getters from "./getters";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    blogConfig
  },
  getters
})

export default store
