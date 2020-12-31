import router from "@/router";
import {getBlogProperty} from "@/api/property";
import {copyProperties} from "@/utils/object";

export default {
  state: {
    blogProperty: {
      blogName: 'Neplog',
      blogAvatar: '',
      authorName: '',
      visitCount: 0,
      installTime: '',
      friendPageCover: '',
      friendPageTitle: '',
      homePageCover: '2',
      homePageTitle: '',
      homePageArticle: 'updateTime,desc',
      icp: '',
      globalCss: '',
    }
  },
  mutations: {
    setBlogConfig(state, property){
      copyProperties(property, state.blogProperty)
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
