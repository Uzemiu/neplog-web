import Vue from 'vue'
import VueRouter from "vue-router";
import store from "@/store";
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import {Message} from "element-ui";

import MainRoutes from './main';
import UserRoutes from './user';
import PlutoRoutes from './pluto';

Vue.use(VueRouter)

const routes = [
  ...MainRoutes,
  ...UserRoutes,
  ...PlutoRoutes,
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
