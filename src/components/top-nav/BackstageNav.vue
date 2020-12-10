<template>
  <nav-item>
    <nav-menu>
      <menu-item :link="'/pluto/dashboard'">仪表盘</menu-item>
      <sub-menu :title="'博客管理'">
        <menu-item :link="'/pluto/editor'">写博客</menu-item>
      </sub-menu>
      <menu-item :link="'/pluto/editor'">友链管理</menu-item>
      <menu-item :link="'/pluto/something'">留言板</menu-item>
      <menu-item :link="'/pluto/config'">设置</menu-item>
    </nav-menu>
  </nav-item>
</template>

<script>
import NavMenu from "@/components/top-nav/menu/NavMenu";
import MenuItem from "@/components/top-nav/menu/MenuItem";
import SubMenu from "@/components/top-nav/menu/SubMenu";
import NavItem from "@/components/top-nav/NavItem";

export default {
  name: "BackstageNav",
  components:{
    NavItem,
    SubMenu,
    NavMenu,
    MenuItem
  }
}
</script>

<style lang="scss" scoped>

</style>
