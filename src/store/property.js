import {getBlogConfigVO} from "@/api/config";

export default {
  state: {
    blogName: 'Neplog',
    blogAvatar: '',
    authorName: '',
    visitCount: 0,
    installTime: '',
    friendPageCover: '',
    friendPageTitle: '',
    homePageCover: '3',
    homePageTitle: '',
    icp: '',
    globalCss: ''
  },
  mutations: {
    setBlogConfig(state, property){
      Object.assign(state, property);
    },
  },
  actions: {
    getBlogConfig({commit}) {
      return new Promise((resolve, reject) => {

        getBlogConfigVO().then(property => {
          commit('setBlogConfig',property)
          resolve(property)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
