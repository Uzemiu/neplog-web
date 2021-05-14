import {getUserInfo, logout, updateUserInfo} from '@/api/user'

export default {
  state: {
    username: '',
    nickname: '',
    avatar: '',
    site: '',
    email: '',
    level: undefined,
    isLogin: false
  },
  mutations: {
    setUser(state, user){
      user.isLogin = true;
      Object.assign(state, user);
    },
    removeUser(state){
      localStorage.removeItem('token');
      Object.assign(state, {
        username: '',
        nickname: '',
        avatar: '',
        site: '',
        email: '',
        level: undefined,
        isLogin: false
      });
    }
  },
  actions: {
    /**
     * 获取用户信息，已登录返回用户信息，未登录抛出异常
     * @returns {Promise<unknown>}
     */
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        if(localStorage['token']){
          getUserInfo().then(user => {
            if(!user){
              commit('removeUser');
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
    updateUserInfo({commit}, user){
      return new Promise((resolve, reject) => {
        updateUserInfo(user).then(user => {
          commit('setUser', user);
          resolve(user);
        }).catch(error => {
          reject(error);
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('removeUser');
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}
