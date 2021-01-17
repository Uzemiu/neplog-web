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

import Element, {Notification} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

import level from '@/components/level/index'
Vue.use(level)

import Cropper from "@/components/cropper";
Vue.use(Cropper)

import PhotoSwipe from 'vue-photoswipe.js';
import 'vue-photoswipe.js/dist/static/css/photoswipe.css';
Vue.use(PhotoSwipe)

import VueScrollReveal from "vue-scroll-reveal/index";
Vue.use(VueScrollReveal, {
  duration: 800,
  scale: 1,
  distance: '10px'
})

Vue.config.productionTip = false

store.dispatch('getBlogProperty').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}).catch(() => {
  Notification.error({title: '获取博客信息失败'})
})


