<template>
  <div id="app">
    <nav-bar></nav-bar>
    <about></about>
    <foot></foot>
  </div>
</template>

<script>

import NavBar from "@/components/nav/NavBar";
import About from "@/components/home/index";
import Foot from "@/components/foot/index";

export default {
  name: 'App',
  components: {
    NavBar,
    About,
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
