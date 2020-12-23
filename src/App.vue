<template>
  <div id="app">
    <nav-bar ref="nav"></nav-bar>
    <main id="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <foot v-if="!pluto"></foot>
      <div id="cover" @click="closeSide"></div>
    </main>
    <foot-menu></foot-menu>
  </div>
</template>

<script>
import NavBar from "@/components/top-nav/index";
import Foot from "@/components/foot/index";
import FootMenu from "@/components/foot/FootMenu"

import store from "@/store";

export default {
  name: 'App',
  components: {
    NavBar,
    Foot,
    FootMenu
  },
  created() {
    if(localStorage['jwt']){
      store.dispatch('getUserInfo').catch(() => {
        localStorage.removeItem('jwt')
        store.commit('removeUser');
        this.$message.warning("当前登录已过期，请重新登录")
      })
    }
    this.$store.dispatch('getBlogProperty');
  },
  methods: {
    closeSide(){
      this.$refs.nav.open = false;
    }
  },
  computed: {
    // 后台不显示页脚
    pluto(){
      let path = this.$route.fullPath
      return path.startsWith('/pluto') || path.startsWith('/user');
    },
  }
}
</script>

<style lang="scss">
@import "assets/css/style.css";
@import "assets/css/popover";

#app, button, textarea{
  font-family: 'Noto Serif SC',"Play",'Open Sans',-apple-system,
  Consolas,
  BlinkMacSystemFont,
  Helvetica Neue, Helvetica,
  Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
}

#app{
  min-height: 100vh;
}

.el-form, .nep-operation, .el-popover.el-popper{
  @import "assets/css/inputs";
}

#main{
  transition: .4s ease-in-out;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#cover{
  position: absolute;
  transition: .4s ease-in-out;
  opacity: 0;
  cursor: pointer;
}
#header.open + #main{
  transform: translateX(-200px);
  #cover{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(31,45,61,.75);
    opacity: 1;
    z-index: 51;
    min-height: 100%;
  }
}

img[lazy=loading]{
  transform: scale(.5);
}
</style>
