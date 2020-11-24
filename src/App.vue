<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view id="main"></router-view>
    </keep-alive>
    <foot></foot>
  </div>
</template>

<script>

import NavBar from "@/components/top-nav/index";
import Foot from "@/components/foot/index";

export default {
  name: 'App',
  components: {
    NavBar,
    Foot
  }
}
</script>

<style lang="scss">
@import "assets/css/style.css";
#app, button, textarea{
  font-family: 'Noto Serif SC',"Play",'Open Sans',-apple-system,
  Consolas,
  BlinkMacSystemFont,
  Helvetica Neue, Helvetica,
  Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
}
#main{
  transition: .4s ease-in-out;
  width: 100%;
  height: 100%;

  &:after{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .4s ease-in-out;
    opacity: 0;
  }
}
#header.open + #main{
  transform: translateX(-200px);

  &:after{
    content: "";
    background-color: rgba(31,45,61,.75);
    opacity: 1;
    z-index: 51;
  }
}

img[lazy=loading]{
  transform: scale(.3);
  //max-height: 100px;
}
</style>
