import {getBlogConfigVO} from "@/api/config";

export default {
  state: {
    blogName: 'Neplog',
    blogAvatar: '',
    authorName: '',
    visitCount: 0,
    installTime: '',
    icp: '',
    globalCss: '',
    // 封面图片 标题
    glide_image_home: '',
    glide_title_home: '',
    glide_image_friend: '',
    glide_title_friend: '',
    glide_image_archive: '',
    glide_title_archive: '',
    glide_image_tag: '',
    glide_title_tag: '',
    glide_image_category: '',
    glide_title_category: '',
    glide_image_about: '',
    glide_title_about: '',
    glide_image_statics: '',
    glide_title_statics: '',
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
