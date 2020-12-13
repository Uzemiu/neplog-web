import Vue from 'vue'
import VueRouter from "vue-router";
import store from "@/store";

const Home = () => import("../views/home/index");
const Article = () => import("../views/article/index")
const Editor = () => import("../views/pluto/article/Editor")
const Friends = () => import("../views/friends/index");

const User = () => import("../views/user/index")
const Login = () => import("../views/user/Login")

const Pluto = () => import("../views/pluto/index")
const PlutoArticle = () => import("../views/pluto/article/index")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article,
    props: true
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
        meta: {enableRedirect: true},
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        meta: {enableRedirect: true},
        props: {register: true},
        component: Login
      },
    ]
  },
  {
    path: '/pluto',
    // meta: {requiresLevel: 6},
    component: Pluto,
    children: [
      {
        path: '/',
        name: 'pluto',
        redirect: 'article'
      },
      {
        path: 'blog'
      },
      {
        path: 'article',
        name: 'pluto-article',
        component: PlutoArticle
      },
      {
        path: 'editor',
        name: 'editor',
        component: Editor
      },
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
    // 权限验证
    let requiredLevel = Math.max(...to.matched.map(record => record.meta.requiresLevel || 1));
    let userLevel = store.getters.user.level;
    if(userLevel === undefined){
      // Vuex中没有存储user信息，尝试获取信息
      if(localStorage['jwt']){
        store.dispatch('getUserInfo')
          .then((user) => {
            if(user.level >= requiredLevel){
              next();
            } else {
              next(`/user/login?redirect=${to.fullPath}`)
            }
          });
      } else {
        next(`/user/login?redirect=${to.fullPath}`)
      }
    } else if(userLevel >= requiredLevel){
      next();
    } else {
      next(`/403`)
    }
  } else {
    next();
  }
})

export default router
