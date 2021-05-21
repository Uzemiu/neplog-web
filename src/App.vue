<template>
  <div id="app">
    <nav-bar ref="nav"></nav-bar>
    <main id="main" class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <foot v-if="!pluto"></foot>
      <div id="cover" @click="closeSide"></div>
    </main>
    <foot-menu></foot-menu>
    <particles-bg
      v-if="!pluto"
      class="particle-bg"
      type="custom"
      :config="bgConfig"
      :bg="false">
    </particles-bg>
  </div>
</template>

<script>
import NavBar from "@/components/top-nav/index";
import Foot from "@/components/foot/index";
import FootMenu from "@/components/foot/FootMenu"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/css/v4-shims.min.css";

export default {
  name: 'App',
  components: {
    NavBar,
    Foot,
    FootMenu
  },
  data(){
    return {
      bgConfig: {
        num: [4, 9],
        rps: 0.77,
        radius: [5, 30],
        life: [1.5, 4],
        v: [.5, 3],
        tha: [-3, 3],
        alpha: [0.6, 0],
        icon: require("@/assets/imgs/bg-icon"),
        scale: [0.1, 0.4],
        position: "all",
        cross: "dead",
        random: 15,
      }
    }
  },
  created() {
    this.$store.dispatch('getUserInfo').catch(() => {});
  },
  methods: {
    closeSide(){
      this.$refs.nav.open = false;
    }
  },
  computed: {
    // 后台不显示页脚以及背景
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

.main{
  @import "assets/css/inputs";

}

/*
图片背景（关闭）
 */
body::before{
  //content: "";
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -2;
  background-image: url("~@/assets/imgs/glide/320671.jpg");
  background-attachment: fixed;
  background-color: rgba(0,0,0,.5);
  filter: blur(8px) brightness(.91);
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

.particle-bg{
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
}

img[lazy=loading]{
  transform: scale(.5);
}

img[preview]{
  cursor: zoom-in;
}
</style>
