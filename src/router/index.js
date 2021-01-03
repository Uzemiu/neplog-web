import Vue from 'vue'
import VueRouter from "vue-router";
import store from "@/store";
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import {Message} from "element-ui";

const Home = () => import("../views/home/index");
const Article = () => import("../views/article/index")
const Editor = () => import("../views/pluto/article/Editor")
const Friend = () => import("../views/friend/index");

const Install = () => import("../views/pluto/install/index")

const User = () => import("../views/user/index")
const Login = () => import("../views/user/Login")

const Pluto = () => import("../views/pluto/index")
const PlutoArticle = () => import("../views/pluto/article/index")
const PlutoFriend = () => import("../views/pluto/friend/index")
const Setting = () => import("../views/pluto/setting/index")

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
    props: true,
    component: Article
  },
  {
    path: '/friend',
    name: 'friends',
    meta: {
      title: '朋友们'
    },
    component: Friend
  },
  {
    path: '/install',
    name: 'install',
    component: Install
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {title: '登录'},
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          title: '注册'
        },
        props: {register: true},
        component: Login
      },
    ]
  },
  {
    path: '/pluto',
    meta: {requiresLevel: 6},
    component: Pluto,
    children: [
      {
        path: '/',
        name: 'pluto',
        redirect: 'article'
      },
      {
        path: 'setting',
        name: 'setting',
        meta: {title: '设置'},
        component: Setting
      },
      {
        path: 'article',
        name: 'pluto-article',
        meta: {title: '文章管理'},
        component: PlutoArticle
      },
      {
        path: 'friend',
        name: 'pluto-friend',
        meta: {title: '友链管理'},
        component: PlutoFriend
      },
      {
        path: 'article/:id',
        name: 'pluto-article-edit',
        props: true,
        meta: {title: '编辑文章'},
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

NProgress.configure({showSpinner: false})

router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  document.title = (title ? (title + ' - ') : '') + store.getters.blogProperty.blogName;
  NProgress.start();
  if (to.matched.some(record => record.meta.requiresLevel)) {
    // 权限验证
    let requiredLevel = Math.max(...to.matched.map(record => record.meta.requiresLevel || 1));
    let user = store.getters.user;
    if (!user.isLogin) {
      // Vuex中没有存储user信息，尝试获取信息
      store.dispatch('getUserInfo').then((user) => {
        if (user.level >= requiredLevel) {
          next();
        } else {
          Message.error('对不起，你没有权限访问此页面')
          next({path: '/403'})
        }
      }).catch(() => {
        Message.error('你当前还未登陆')
        next(`/user/login?redirect=${to.fullPath}`)
      });
    } else if (user.level >= requiredLevel) {
      next();
    } else {
      next({path: '/403'})
    }
  } else {
    next();
  }
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  NProgress.done();
})

export default router
