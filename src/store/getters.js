import NeplogConfig from "@/config/neplog"
import GlideConfig from "@/config/glide";
import store from "@/store/index";

export default {
  common: state => state.common,

  meta: state => state.meta,
  title: state => (state.meta.title ? (state.meta.title + ' - ') : '') + store.getters.blogConfig.blogName,

  user: state => state.user,
  isLogin: state => state.user.isLogin,
  isOwner: state => state.user.isLogin && state.user.level === 6,

  blogConfig: state => state.blogConfig,
  authorName: state => state.blogConfig.authorName || NeplogConfig.authorName,
  blogAvatar: state => state.blogConfig.blogAvatar || NeplogConfig.blogAvatar,
  icp: state => state.blogConfig.icp || NeplogConfig.icp,
  homePageImage: state => state.blogConfig.homePageCover || GlideConfig.homePageImage,

}
