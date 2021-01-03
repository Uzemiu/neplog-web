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
      homePageCover: '3',
      homePageTitle: '',
      homePageArticle: '',
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
          commit('setBlogConfig',property)
          resolve(property)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
