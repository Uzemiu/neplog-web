import neplogConfig from "@/config/neplog"

export default {
  common: state => state.common,

  user: state => state.user,
  isLogin: state => state.user.isLogin,
  isOwner: state => state.user.isLogin && state.user.level === 6,

  blogConfig: state => state.blogConfig,
  homePageCover: state => state.blogConfig.homePageCover || neplogConfig.homePageCover,
  authorName: state => state.blogConfig.authorName || neplogConfig.authorName,
  userAvatar: state => state.blogConfig.avatar || neplogConfig.defaultAvatar,
}
