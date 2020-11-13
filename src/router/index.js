import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',

  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'link-active',
  //切换页面回顶部
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

export default router
