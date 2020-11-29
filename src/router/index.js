import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import("../views/home/index");
const Article = () => import("../views/article/index")
const Editor = () => import("../components/editor/index")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/article/:articleId',
    component: Article
  },
  {
    path: '/editor',
    component: Editor
  },
  {
    path: '/friends',
    component: () => import("../views/friends/index")
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'link-active',
  //切换页面回顶部
  // scrollBehavior() {
  //   return {x: 0, y: 0}
  // }
})

export default router
