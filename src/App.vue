<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <foot></foot>
  </div>
</template>

<script>

import NavBar from "@/components/nav/NavBar";
import Foot from "@/components/foot/index";

export default {
  name: 'App',
  components: {
    NavBar,
    Foot
  }
}
</script>

<style>
@import "assets/css/style.css";
#app{

  scroll-behavior: smooth;
}
</style>
