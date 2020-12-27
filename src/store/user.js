import { userInfo } from '@/api/user'
import {Message} from "element-ui";

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
    /**
     * 获取用户信息，已登录返回用户信息，未登录抛出异常
     * @returns {Promise<unknown>}
     */
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        if(localStorage['jwt']){
          userInfo().then(user => {
            if(!user){
              commit('removeUser');
              localStorage.removeItem('jwt');
              this.$message.warning("当前登录已过期，请重新登录")
              reject();
            } else {
              commit('setUser',user)
              resolve(user)
            }
          }).catch(error => {
            reject(error)
          })
        } else {
          reject();
        }
      })
    },
  }
}
