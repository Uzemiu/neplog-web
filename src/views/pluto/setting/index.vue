<template>
  <div class="pluto-setting">
    <h2 class="sharp-header">设置</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="博客" name="blog"></el-tab-pane>
      <el-tab-pane label="封面" name="cover"></el-tab-pane>
      <el-tab-pane label="COS" name="cos"></el-tab-pane>
      <el-tab-pane label="其他" name="other"></el-tab-pane>
    </el-tabs>

    <div class="icon-wrapper">
      <i class="loading-icon"
         :class="iconClass"
         :style="{color: iconColor}"></i>
    </div>

    <component
        :is="activeComponent"
        @beforeUpdate="loadingIcon"
        @afterUpdate="updateIcon">
    </component>

  </div>
</template>

<script>
import {resetProperty} from "@/api/property";
import BlogSetting from "@/views/pluto/setting/BlogSetting";
import CoverSetting from "@/views/pluto/setting/CoverSetting";
import OtherSetting from "@/views/pluto/setting/OtherSetting";
import CosSetting from "@/views/pluto/setting/CosSetting";

const components = {
  'blog': BlogSetting,
  'cover': CoverSetting,
  'cos': CosSetting,
  'other': OtherSetting
}
export default {
  name: "PlutoSetting",
  data() {
    return {
      activeSection: this.$route.query.section || 'blog',
      iconClass: 'el-icon-check',
      iconColor: '#5daf34',
    }
  },
  methods: {
    resetProperty() {
      resetProperty().then(() => {
        this.$message.success("重置博客设置成功")
        this.$store.dispatch('getBlogProperty')
      }, error => {
        this.$message.error("重置博客设置失败: " + error.message)
      })
    },
    changeSection(tab) {
      this.activeSection = tab.name
    },
    loadingIcon(){
      this.iconClass = 'el-icon-loading'
      this.iconColor = '#8d8d8d'
    },
    updateIcon(status){
      this.iconClass = status ? 'el-icon-check' : 'el-icon-close'
      this.iconColor = status ? '#5daf34' : '#ff434f'
    }
  },
  computed: {
    activeComponent(){
      return components[this.activeSection];
    }
  }
}
</script>

<style lang="scss" scoped>
.pluto-setting{
  position: relative;
  max-width: 100%;
  @import "pluto-setting";

  .icon-wrapper{
    position: relative;
    margin-bottom: 3px;
  }
  .loading-icon{
    position: absolute;
    right: 0;
    top: -14px;
    z-index: 20;
    font-weight: 600;
  }
}
</style>
