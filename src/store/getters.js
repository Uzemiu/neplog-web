import NeplogConfig from "@/config/neplog"
import store from "@/store/index";

export default {
  common: state => state.common,
  // Meta
  meta: state => state.meta,
  title: state => (state.meta.title ? (state.meta.title + ' - ') : '') + store.getters.blogConfig.blogName,
  // User
  user: state => state.user,
  isLogin: state => state.user.isLogin,
  isOwner: state => state.user.isLogin && state.user.level === 6,
  userAvatar: state => state.user.avatar || NeplogConfig.defaultAvatar,
  // Blog
  blogConfig: state => state.blogConfig,
  authorName: state => state.blogConfig.authorName || NeplogConfig.authorName,
  blogAvatar: state => state.blogConfig.blogAvatar || NeplogConfig.blogAvatar,
  icp: state => state.blogConfig.icp || NeplogConfig.icp,

}
