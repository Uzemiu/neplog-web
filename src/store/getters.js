import neplogConfig from "@/config/neplog"
import store from "@/store/index";

export default {
  common: state => state.common,

  meta: state => state.meta,
  title: state => (state.meta.title ? (state.meta.title + ' - ') : '') + store.getters.blogConfig.blogName,

  user: state => state.user,
  isLogin: state => state.user.isLogin,
  isOwner: state => state.user.isLogin && state.user.level === 6,

  blogConfig: state => state.blogConfig,
  homePageCover: state => state.blogConfig.homePageCover || neplogConfig.homePageCover,
  authorName: state => state.blogConfig.authorName || neplogConfig.authorName,
  blogAvatar: state => state.blogConfig.blogAvatar,

  userAvatar: state => state.blogConfig.avatar || neplogConfig.defaultAvatar,
}
