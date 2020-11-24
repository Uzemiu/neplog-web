import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import Element from 'element-ui'
import anime from 'animejs';
import VueLazyload from "vue-lazyload";

Vue.prototype.$anime = anime;
Vue.config.productionTip = false

import mavonEditor from '@neptu/mavon-editor'
Vue.use(mavonEditor)

Vue.use(Element,{size: 'small'})
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueLazyload,{
  preload: 1.3,
  loading: require('@/assets/imgs/loading.svg'),
  attempt: 3,
  lazyComponent: true
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
