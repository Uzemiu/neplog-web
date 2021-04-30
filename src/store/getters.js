import config from "@/config/neplog"

export default {
  user: state => state.user.user,
  isLogin: state => state.user.user.isLogin,
  isOwner: state => state.user.user.isLogin && state.user.user.level === 6,
  blogConfig: state => state.blogConfig.blogConfig,
  //homePageArticle: state => state.blogProperty.blogProperty.homePageArticle.split(/[-:]/),
  homePageCover: state => state.blogConfig.blogConfig.homePageCover || config.homePageCover,
  authorName: state => state.blogConfig.blogConfig.authorName || config.authorName,
  userAvatar: state => state.blogConfig.blogConfig.avatar || config.defaultAvatar
}
