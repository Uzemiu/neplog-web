import {getBlogProperty} from "@/api/property";
import router from "@/router";

export default {
  state: {
    blogProperty: {
      blogName: 'Neplog',
      visitCount: 0,
      installTime: '',
      friendPageCover: '',
      homePageGlide: 'auto',
      homePageArticle: 'updateTime,desc',
      icp: '',
      globalCss: '',
    }
  },
  mutations: {
    setBlogConfig(state, property){
      state.blogProperty = property;
    },
  },
  actions: {
    getBlogProperty({commit}) {
      return new Promise((resolve, reject) => {
        getBlogProperty().then(property => {
          // 博客未创建
          if(Object.keys(property).length === 0 || !property.installStatus){
            router.push('/install');
          } else {
            commit('setBlogConfig',property)
          }
          resolve(property)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
