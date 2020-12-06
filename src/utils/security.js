import store from "@/store";
import {userInfo} from "@/api/user/user";

export default {
  getUserInfo(){
    userInfo().then(data => {
      store.commit('setUser',data)
    })
  }
}
