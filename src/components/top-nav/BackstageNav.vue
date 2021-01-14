<template>
  <nav-item>
    <nav-menu>
      <menu-item :link="'/pluto/dashboard'">仪表盘</menu-item>
      <menu-item :link="'/pluto/article'">博客管理</menu-item>
      <menu-item :link="'/pluto/friend'">友链管理</menu-item>
      <menu-item :link="'/pluto/file'">文件管理</menu-item>
      <menu-item :link="'/pluto/setting'">设置</menu-item>
    </nav-menu>
  </nav-item>
</template>

<script>
import NavMenu from "@/components/top-nav/menu/NavMenu";
import MenuItem from "@/components/top-nav/menu/MenuItem";
import NavItem from "@/components/top-nav/NavItem";

export default {
  name: "BackstageNav",
  components:{
    NavItem,
    NavMenu,
    MenuItem
  }
}
</script>

<style lang="scss" scoped>

</style>
