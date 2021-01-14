const User = () => import("../views/user/index")
const Login = () => import("../views/user/Login")

const routes = [
  {
    path: '/user',
    component: User,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {title: '登录'},
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          title: '注册'
        },
        props: {register: true},
        component: Login
      },
    ]
  },
]

export default routes;
