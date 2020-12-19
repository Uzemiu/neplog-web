export default {
  user: state => state.user.user,
  blogProperty: state => state.blogProperty.blogProperty,
  homePageArticle: state => state.blogProperty.blogProperty.homePageArticle.split(/[-:]/)
}
