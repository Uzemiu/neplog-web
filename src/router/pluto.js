const Pluto = () => import("../views/pluto/index")
const DashBoard = () => import("../views/pluto/dashboard/index")
const PlutoArticle = () => import("../views/pluto/article/index")
const PlutoCategoryTag = () => import("../views/pluto/categorytag/index")
const PlutoFriend = () => import("../views/pluto/friend/index")
const PlutoFile = () => import("../views/pluto/file/index")
const PlutoComment = () => import("../views/pluto/comment/index")
const Setting = () => import("../views/pluto/setting/index")
const Editor = () => import("../views/pluto/article/Editor")

const routes = [
  {
    path: '/pluto',
    meta: {requiresLevel: 6},
    component: Pluto,
    children: [
      {
        path: '/',
        name: 'pluto',
        redirect: 'article'
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {title: '仪表盘'},
        component: DashBoard
      },
      {
        path: 'setting',
        name: 'setting',
        meta: {title: '设置'},
        component: Setting
      },
      {
        path: 'article',
        name: 'pluto-article',
        meta: {title: '文章管理'},
        component: PlutoArticle
      },
      {
        path: 'category-tag',
        name: 'pluto-category-tag',
        meta: {title: '分类/标签'},
        component: PlutoCategoryTag
      },
      {
        path: 'comment',
        name: 'pluto-comment',
        meta: {title: '评论管理'},
        component: PlutoComment
      },
      {
        path: 'friend',
        name: 'pluto-friend',
        meta: {title: '友链管理'},
        component: PlutoFriend
      },
      {
        path: 'file',
        name: 'pluto-file',
        meta: {title: '文件管理'},
        component: PlutoFile
      },
      {
        path: 'article/:id',
        name: 'pluto-article-edit',
        props: true,
        meta: {title: '编辑文章'},
        component: Editor
      },
    ]
  },
]

export default routes;
