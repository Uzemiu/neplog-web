const Home = () => import("../views/home/index");
const Article = () => import("../views/article/index");
const Friend = () => import("../views/friend/index");

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
    path: '/friend',
    name: 'friends',
    meta: {
      title: '朋友们'
    },
    component: Friend
  },
];

export default routes;
