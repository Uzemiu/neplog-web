<template>
  <nav-item>
    <nav-menu>
      <menu-item><router-link to="/">首页</router-link></menu-item>
      <menu-item><router-link to="/friends">朋友们</router-link></menu-item>
      <menu-item><router-link to="/article">关于</router-link></menu-item>
      <menu-item>
        <a href="#">有什么呢</a>
        <sub-menu>
          <menu-item><router-link to="/statics">统计信息</router-link></menu-item>
          <menu-item><router-link to="/another">其他1</router-link></menu-item>
          <menu-item><router-link to="/another">打卡</router-link></menu-item>
        </sub-menu>
      </menu-item>
      <slot name="search-bar"></slot>
    </nav-menu>
  </nav-item>
</template>

<script>
import MenuItem from "@/components/top-nav/menu/MenuItem";
import SubMenu from "@/components/top-nav/menu/SubMenu";
import NavMenu from "@/components/top-nav/menu/NavMenu";
import NavItem from "@/components/top-nav/NavItem";
export default {
  name: "MainNav",
  components: {
    NavItem,
    SubMenu,
    MenuItem,
    NavMenu
  }
}
</script>

<style scoped>

</style>
