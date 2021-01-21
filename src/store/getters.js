import config from "@/config/neplog"

export default {
  user: state => state.user.user,
  isLogin: state => state.user.user.isLogin,
  isOwner: state => state.user.user.isLogin && state.user.user.level === 6,
  blogProperty: state => state.blogProperty.blogProperty,
  homePageArticle: state => state.blogProperty.blogProperty.homePageArticle.split(/[-:]/),
  homePageCover: state => state.blogProperty.blogProperty.homePageCover || config.homePageCover,
  authorName: state => state.blogProperty.blogProperty.authorName || config.authorName,
  userAvatar: state => state.blogProperty.blogProperty.avatar || config.defaultAvatar
}
