<template>
  <nav-item>
    <nav-menu>
      <menu-item link="/"><i class="fa fa-fort-awesome"></i>首页</menu-item>
      <sub-menu title="文章">
        <template slot="title"><i class="fa fa-file-text-o"></i>文章</template>
        <menu-item link="/archive"><i class="fa fa-archive"></i>归档</menu-item>
        <menu-item link="/category"><i class="fa fa-folder-open-o"></i>分类</menu-item>
        <menu-item link="/tag"><i class="fa fa-tags"></i>标签</menu-item>
      </sub-menu>
      <menu-item link="/friend"><i class="fa fa-link"></i>朋友们</menu-item>
      <menu-item link="/about"><i class="fa fa-hand-o-right"></i>关于</menu-item>
      <sub-menu title="有什么呢">
        <template slot="title"><i class="fa fa-send"></i>有什么呢</template>
        <menu-item link="/statics"><i class="fa fa-bar-chart-o"></i>统计信息</menu-item>
        <template v-if="$store.getters.isLogin">
          <menu-item link="/user/setting"><i class="fa fa-user"></i>个人设置</menu-item>
        </template>
        <template v-else>
          <menu-item link="/user/login"><i class="fa fa-user"></i>登录</menu-item>
          <menu-item link="/user/register"><i class="fa fa-user"></i>注册</menu-item>
        </template>
        <menu-item
          link="/pluto"
          v-if="$store.getters.isOwner">
          <i class="fa fa-gear"></i>后台管理
        </menu-item>
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
