const Home = () => import("../views/main/home/index");
const Article = () => import("../views/main/article/index");
const Archive = () => import("../views/main/archive/index");
const ArticleTag = () => import("../views/main/tag/index");
const ArticleCategory = () => import("../views/main/category/index");
const Friend = () => import("../views/main/friend/index");
const About = () => import("../views/main/about/index");
const Search = () => import("../views/main/search/index")

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      metaInfo: {
        title: '主页',
        keywords: 'Neplog 主页',
        description: ''
      }
    },
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
    meta: {
      metaInfo: {
        title: '归档',
        keywords: '文章归档',
        description: ''
      }
    },
    component: Archive
  },
  {
    path: '/tag',
    name: 'article-tag',
    meta: {
      metaInfo: {
        title: '标签',
        keywords: '文章标签',
        description: ''
      }
    },
    component: ArticleTag
  },
  {
    path: '/tag/:id',
    name: 'article-tag-with-id',
    props: true,
    meta: {
      metaInfo: {
        title: '标签',
        keywords: '文章标签',
        description: ''
      }
    },
    component: ArticleTag
  },
  {
    path: '/category',
    name: 'article-category',
    meta: {
      metaInfo: {
        title: '分类',
        keywords: '文章分类',
        description: ''
      }
    },
    component: ArticleCategory
  },
  {
    path: '/category/:id',
    name: 'article-category-with-id',
    props: true,
    meta: {
      metaInfo: {
        title: '分类',
        keywords: '文章分类',
        description: ''
      }
    },
    component: ArticleCategory
  },
  {
    path: '/friend',
    name: 'friends',
    meta: {
      metaInfo: {
        title: '朋友们',
        keywords: '友情链接',
        description: ''
      }
    },
    component: Friend
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      metaInfo: {
        title: '关于',
        keywords: 'Neplog,关于',
        description: ''
      }
    },
    component: About
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      metaInfo: {
        title: '搜索'
      }
    },
    component: Search
  }
];

export default routes;
