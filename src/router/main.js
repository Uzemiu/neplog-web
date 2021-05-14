const Home = () => import("../views/main/home/index");
const Article = () => import("../views/main/article/index");
const Archive = () => import("../views/main/archive/index");
const ArticleTag = () => import("../views/main/tag/index");
const ArticleCategory = () => import("../views/main/category/index");
const Friend = () => import("../views/main/friend/index");
const About = () => import("../views/main/about/index");

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
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/tag',
    name: 'article-tag',
    component: ArticleTag
  },
  {
    path: '/category',
    name: 'article-category',
    component: ArticleCategory
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
    path: '/about',
    name: 'about',
    meta: {title: '关于'},
    component: About
  }
];

export default routes;
