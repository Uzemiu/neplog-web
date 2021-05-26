<template>
  <nav-item>
    <nav-menu>
      <menu-item link="/"><i class="fa fa-home"></i>首页</menu-item>
      <menu-item link="/pluto/dashboard"><i class="fa fa-tachometer"></i>仪表盘</menu-item>
      <menu-item link="/pluto/article"><i class="fa fa-file-text-o"></i>文章</menu-item>
      <menu-item link="/pluto/category-tag"><i class="fa fa-folder-open-o"></i>分类/标签<i class="fa fa-tags"></i></menu-item>
      <menu-item link="/pluto/comment"><i class="fa fa-comment-o"></i>评论</menu-item>
      <menu-item link="/pluto/friend"><i class="fa fa-link"></i>友链</menu-item>
      <menu-item link="/pluto/file"><i class="fa fa-file-o"></i>文件</menu-item>
      <menu-item link="/pluto/setting"><i class="fa fa-gear"></i>设置</menu-item>
    </nav-menu>
  </nav-item>
</template>

<script>
import NavMenu from "@/components/top-nav/menu/NavMenu";
import MenuItem from "@/components/top-nav/menu/MenuItem";
import NavItem from "@/components/top-nav/NavItem";

export default {
  name: "AdminNav",
  components:{
    NavItem,
    NavMenu,
    MenuItem
  }
}
</script>

<style lang="scss" scoped>

</style>
