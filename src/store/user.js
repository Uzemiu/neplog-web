import { userInfo } from '@/api/user'

export default {
  state: {
    user: {
      username: '',
      nickname: '',
      avatar: '',
      level: undefined
    }
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
    removeUser(state){
      state.user = {
        username: '',
        nickname: '',
        avatar: '',
        level: undefined
      }
    }
  },
  actions: {
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        userInfo().then(user => {
          commit('setUser',user)
          resolve(user)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
