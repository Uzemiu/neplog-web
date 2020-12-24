import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from "@/router"
import store from "@/store"

import anime from 'animejs';
Vue.prototype.$anime = anime;

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload,{
  preload: 1.3,
  loading: require('@/assets/imgs/loading.svg'),
  attempt: 3,
  lazyComponent: true
})

import mavonEditor from '@/utils/editor'
Vue.use(mavonEditor)

import Element from 'element-ui'
Vue.use(Element)
import 'element-ui/lib/theme-chalk/index.css'

import level from '@/components/level/index'
Vue.use(level)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
