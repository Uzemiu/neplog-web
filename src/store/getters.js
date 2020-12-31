import config from "@/config/neplog"

export default {
  user: state => state.user.user,
  blogProperty: state => state.blogProperty.blogProperty,
  homePageArticle: state => state.blogProperty.blogProperty.homePageArticle.split(/[-:]/),
  isHomePageCover: state => !Number.parseInt(state.blogProperty.blogProperty.homePageCover),
  authorName: state => state.blogProperty.blogProperty.authorName || config.authorName
}
