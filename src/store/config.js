import {getBlogConfig} from "@/api/config";
import router from "@/router";

export default {
  state: {
    blogConfig: {
      blogName: '',
    }
  },
  mutations: {
    setBlogConfig(state, config){
      state.blogConfig = config;
    },
  },
  actions: {
    getBlogConfig({commit}) {
      return new Promise((resolve, reject) => {
        getBlogConfig().then(config => {
          // 博客未创建
          if(Object.keys(config).length === 0){
            router.push('/install');
          } else {
            commit('setBlogConfig',config)
          }
          resolve(config)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
