<template>
  <nav-item>
    <nav-menu>
      <menu-item>
        <a href="#">博客管理</a>
        <sub-menu>
          <menu-item><router-link to="/pluto/editor">写博客</router-link></menu-item>
        </sub-menu>
      </menu-item>

      <menu-item><router-link to="/pluto/editor">友链管理</router-link></menu-item>
      <menu-item><router-link to="/pluto/editor">留言板</router-link></menu-item>
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
