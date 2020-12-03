import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import("../views/home/index");
const Article = () => import("../views/article/index")
const Editor = () => import("../components/editor/index")
const Friends = () => import("../views/friends/index");

const User = () => import("../views/user/index")
const Login = () => import("../views/user/Login")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: Article
  },
  {
    path: '/editor',
    component: Editor
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Login,
        props: {register: true}
      }
    ]
  },
  {
    path: '/pluto',
    meta: {requiresLevel: 6},
    children: [
      {
        path: '/',
        name: 'pluto',
        redirect: 'blog'
      },
      {
        path: 'blog'
      }
    ]
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

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiresLevel)){
    // if logged in
    next();
  } else {
    next();
  }
})


export default router
