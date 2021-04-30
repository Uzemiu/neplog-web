<template>
  <nav-item>
    <nav-menu>
      <menu-item link="/">首页</menu-item>
      <menu-item link="/friend">朋友们</menu-item>
      <menu-item link="/article">关于</menu-item>
      <sub-menu title="有什么呢">
        <menu-item link="/statics">统计信息</menu-item>
        <menu-item link="/another">其他1</menu-item>
        <template v-if="$store.getters.isLogin">
          <menu-item link="/user">个人设置</menu-item>
        </template>
        <template v-else>
          <menu-item link="/user/login">登录</menu-item>
          <menu-item link="/user/register">注册</menu-item>
        </template>
        <menu-item link="/pluto" v-if="$store.getters.isOwner">后台管理</menu-item>
      </sub-menu>
      <slot></slot>
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
