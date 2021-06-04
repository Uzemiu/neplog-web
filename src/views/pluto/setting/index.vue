<template>
  <setting :components="components" :tabs="tabs" title="博客设置"></setting>
</template>

<script>
import BlogSetting from "@/views/pluto/setting/BlogSetting";
import CoverSetting from "@/views/pluto/setting/CoverSetting";
import AboutSetting from "@/views/pluto/setting/AboutSetting";
import Setting from "@/components/setting/index";

export default {
  name: "PlutoSetting",
  components: {Setting},
  data() {
    return {
      components: {
        'blog': BlogSetting,
        'cover': CoverSetting,
        'about': AboutSetting
      },
      tabs: [
        {label: '博客设置', name:'blog'},
        {label: '封面设置', name:'cover'},
        {label: '关于界面', name:'about'},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner{
  height: 36px;
}
</style>
