const User = () => import("../views/user/index")
const Login = () => import("../views/user/Login")
const UserSetting = () => import("../views/user/UserSetting")

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
      {
        path: 'setting',
        name: 'userSetting',
        meta: {
          title: '个人信息设置'
        },
        component: UserSetting
      }
    ]
  },
]

export default routes;
