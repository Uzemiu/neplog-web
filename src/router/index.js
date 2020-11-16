import Vue from 'vue'
import VueRouter from "vue-router";

const About = () => import("@/components/home/index");
const Article = () => import("@/components/article/index")
const Editor = () => import("@/components/editor/index")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: About
  },
  {
    path: '/article/:articleId',
    component: Article
  },
  {
    path: '/editor',
    component: Editor
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
