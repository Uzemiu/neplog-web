const page404 = () => import("../views/common/Page404");

const routes = [
  {
    path: '/404',
    name: 'page404',
    meta: {
      metaInfo: {
        title: 'NotFound',
        keywords: '',
        description: ''
      }
    },
    component: page404
  },
  {
    path: '*',
    redirect:{
      name: 'page404'
    }
  }
];

export default routes;
