import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import Element from 'element-ui'
import anime from 'animejs';

Vue.prototype.$anime = anime;
Vue.config.productionTip = false

Vue.use(Element,{size: 'small'})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
